import React, { useEffect, useState, useRef } from "react";

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
}

interface Response {
  questionId: number;
  answer: string;
  feedback: string;
}

interface InterviewSessionProps {
  config: {
    duration: number; // minutes
    category: string;
    difficulty: string;
    jobRole?: string;
    company?: string;
  };
  onComplete: (responses: Response[]) => void;
}

// Call your backend API to fetch AI-generated questions based on config
async function fetchAIQuestions(config: InterviewSessionProps["config"]): Promise<Question[]> {
  const res = await fetch("/api/questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Send config fields directly, not nested inside "config"
    body: JSON.stringify({
      duration: config.duration,
      category: config.category,
      difficulty: config.difficulty,
      jobRole: config.jobRole,
      company: config.company,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch AI questions");
  }

  const data = await res.json();
  // Expecting { questions: Question[] }
  return data.questions;
}

// Call your backend API to get feedback for a given question and user answer
async function fetchFeedback(
  question: Question,
  answer: string
): Promise<string> {
  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Send question text and answer directly, no nested config
    body: JSON.stringify({
      question: question.text,
      answer: answer,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch feedback");
  }

  const data = await res.json();
  // Expecting { feedback: string }
  return data.feedback;
}

export const InterviewSession: React.FC<InterviewSessionProps> = ({ config, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [responses, setResponses] = useState<Response[]>([]);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Timer in seconds
  const totalSeconds = config.duration * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoadingQuestions(true);
    setError(null);
    fetchAIQuestions(config)
      .then((qs) => {
        setQuestions(qs);
        setCurrentQuestionIndex(0);
        setLoadingQuestions(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load questions. Please try again later.");
        setQuestions([]);
        setLoadingQuestions(false);
      });
  }, [config]);

  useEffect(() => {
    if (loadingQuestions) return;
    if (secondsLeft <= 0) {
      handleCompleteInterview();
      return;
    }

    timerRef.current = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [secondsLeft, loadingQuestions]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmitAnswer = async () => {
    if (!currentQuestion || !currentAnswer.trim()) return;

    setIsGeneratingFeedback(true);
    setError(null);

    try {
      // Call backend AI to get feedback for current question & user answer
      const feedback = await fetchFeedback(currentQuestion, currentAnswer.trim());

      setResponses((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          answer: currentAnswer.trim(),
          feedback,
        },
      ]);
      setCurrentAnswer("");

      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        handleCompleteInterview();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate feedback. Please try again.");
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const handleCompleteInterview = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onComplete(responses);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-gray-800 rounded-3xl shadow-xl p-8 space-y-6">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-indigo-200">Mock Interview Session</h2>
          <div
            className={`font-mono text-lg ${
              secondsLeft <= 30 ? "text-red-600 font-bold animate-pulse" : "text-gray-700"
            }`}
            aria-live="polite"
            aria-label="Time remaining"
          >
            {formatTime(secondsLeft)}
          </div>
        </header>

        {loadingQuestions ? (
          <p className="text-center text-indigo-300">Loading questions from AI...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : questions.length === 0 ? (
          <p className="text-center text-red-600">No questions available. Try again later.</p>
        ) : (
          <>
            <div className="bg-gray-800 p-6 rounded-xl border border-primary-200">
              <p className="text-lg font-medium text-indigo-300">{currentQuestion.text}</p>
              <div className="mt-3 text-sm text-indigo-200">
                Category: <strong>{currentQuestion.category}</strong> | Difficulty:{" "}
                <strong>{currentQuestion.difficulty}</strong>
              </div>
            </div>

            <textarea
              rows={5}
              placeholder="Type your answer here..."
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="w-full border bg-gray-600 text-indigo-200 border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isGeneratingFeedback}
              aria-label="Your answer"
            />

            <button
              onClick={handleSubmitAnswer}
              disabled={isGeneratingFeedback || !currentAnswer.trim()}
              className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                isGeneratingFeedback || !currentAnswer.trim()
                  ? "bg-indigo-200 cursor-not-allowed"
                  : "bg-indigo-300 hover:bg-indigo-400"
              }`}
            >
              {isGeneratingFeedback ? "Generating feedback..." : "Submit Answer"}
            </button>

            {responses.length > 0 && (
              <div className="mt-6 p-4 bg-indigo-100 border border-indigo-300 rounded-lg text-indigo-300">
                <strong>Feedback:</strong> {responses[responses.length - 1].feedback}
              </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-500 italic">
              Pro Tip: Stay calm and focus on clearly communicating your thought process.
            </div>
          </>
        )}
      </div>
    </div>
  );
};
