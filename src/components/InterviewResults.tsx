import React from 'react';
import {
  ArrowLeft,
  Trophy,
  Target,
  Download,
  Share2,
  Calendar,
} from 'lucide-react';
import { InterviewSession } from '../types/interview';
import { Footer } from './Footer';

interface InterviewResultsProps {
  session: InterviewSession;
  onBack: () => void;
  onNewInterview: () => void;
}

export const InterviewResults: React.FC<InterviewResultsProps> = ({
  session,
  onBack,
  onNewInterview,
}) => {
  // Score color logic based on ranges
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-success-600'; // green
    if (score >= 70) return 'text-warning-600'; // yellow/orange
    return 'text-error-600'; // red
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 85) return 'bg-success-100 border-success-200';
    if (score >= 70) return 'bg-warning-100 border-warning-200';
    return 'bg-error-100 border-error-200';
  };

  // Helper to infer score from a single feedback string
  const getScoreFromFeedback = (feedback?: string) => {
    if (!feedback) return 50; // neutral default if no feedback
    const fb = feedback.toLowerCase();
    if (fb.includes('excellent') || fb.includes('great') || fb.includes('outstanding'))
      return 90;
    if (fb.includes('good') || fb.includes('solid') || fb.includes('well done'))
      return 75;
    if (fb.includes('improve') || fb.includes('needs') || fb.includes('weak'))
      return 50;
    return 60; // fallback neutral-ish
  };

  // Compute average score from all responses feedback
  const calculateOverallScore = (responses: typeof session.responses) => {
    if (!responses || responses.length === 0) return 0;
    const totalScore = responses.reduce(
      (acc, r) => acc + getScoreFromFeedback(r.feedback),
      0
    );
    return Math.round(totalScore / responses.length);
  };

  // Custom overall assessment text based on score, questions answered, and duration
  const generateAssessment = (
    score: number,
    session: InterviewSession
  ) => {
    const answered = session.responses?.length ?? 0;
    const durationMinutes =
      session.endTime && session.startTime
        ? Math.round((session.endTime.getTime() - session.startTime.getTime()) / 60000)
        : 0;

    if (score >= 85) {
      return `Excellent work! You answered ${answered} questions confidently in ${durationMinutes} minutes. Your strong technical knowledge and communication skills really stood out.`;
    }
    if (score >= 70) {
      return `Good job! You answered ${answered} questions and demonstrated solid understanding and communication skills. With a bit more practice, you can reach excellent performance.`;
    }
    return `You answered ${answered} questions. There’s room for improvement in your answers and confidence. Consider reviewing core concepts and practicing common interview questions to improve your score next time.`;
  };

  const questionsCount = session.questions?.length || 0;
  const responses = session.responses || [];

  // Calculate score either from session.overallScore or from responses feedback
  const overallScore = session.overallScore ?? calculateOverallScore(responses);
  // Use existing feedback if present, otherwise generate dynamically
  const overallAssessment = session.feedback || generateAssessment(overallScore, session);

  const durationMinutes =
    session.endTime && session.startTime
      ? Math.round((session.endTime.getTime() - session.startTime.getTime()) / 60000)
      : 0;

  return (
    <><div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          aria-label="Back to Home"
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors mb-8 focus:outline-none focus:ring-2 focus:ring-primary-400 rounded"
        >
          <ArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" />
          Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Trophy className="h-12 w-12 text-warning-500" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Complete!</h1>
            <p className="text-xl text-gray-600">Here's how you performed</p>
          </div>

          {/* Overall Score */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <section
              className={`rounded-2xl border-2 p-8 text-center ${getScoreBgColor(overallScore)}`}
              aria-label="Overall Score"
            >
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(overallScore)}`}>
                {overallScore}
              </div>
              <div className="text-gray-600 font-semibold">Overall Score</div>
            </section>

            <section
              className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-8 text-center"
              aria-label="Questions Answered"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">{questionsCount}</div>
              <div className="text-gray-600 font-semibold">Questions Answered</div>
            </section>

            <section
              className="bg-secondary-50 border-2 border-secondary-200 rounded-2xl p-8 text-center"
              aria-label="Duration"
            >
              <div className="text-4xl font-bold text-secondary-600 mb-2">{durationMinutes}m</div>
              <div className="text-gray-600 font-semibold">Duration</div>
            </section>
          </div>

          {/* Detailed Feedback */}
          <section className="mb-12" aria-labelledby="detailed-feedback-heading">
            <h2
              id="detailed-feedback-heading"
              className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
            >
              <Target className="h-6 w-6 text-primary-500 mr-3" aria-hidden="true" />
              Detailed Feedback
            </h2>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Assessment</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{overallAssessment}</p>
            </div>

            {/* Question by Question Analysis */}
            {responses.length > 0 && (
              <div className="space-y-6" aria-label="Question Analysis">
                <h3 className="text-lg font-semibold text-gray-900">Question Analysis</h3>
                {responses.map((response, index) => {
                  const question = session.questions?.find(
                    (q) => q.id === response.questionId
                  );
                  return (
                    <article
                      key={response.questionId}
                      className="bg-white border border-gray-200 rounded-2xl p-6"
                      aria-labelledby={`question-${response.questionId}-title`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                              Q{index + 1}
                            </span>
                            <span
                              className={`w-2 h-2 rounded-full mr-2 ${question?.difficulty === 'easy'
                                  ? 'bg-success-500'
                                  : question?.difficulty === 'medium'
                                    ? 'bg-warning-500'
                                    : 'bg-error-500'}`}
                              aria-label={`Difficulty: ${question?.difficulty}`}
                              role="img"
                            ></span>
                            <span className="text-sm text-gray-500 capitalize">
                              {question?.category} • {question?.difficulty}
                            </span>
                          </div>
                          <p
                            id={`question-${response.questionId}-title`}
                            className="text-gray-900 font-medium mb-3"
                          >
                            {question?.text}
                          </p>
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-gray-700 text-sm">
                              <strong>Your Answer:</strong>
                            </p>
                            <p className="text-gray-600 mt-2 whitespace-pre-wrap">{response.answer}</p>
                          </div>
                          {response.feedback && (
                            <div className="bg-primary-50 rounded-lg p-4">
                              <p className="text-primary-900 text-sm">
                                <strong>Feedback:</strong>
                              </p>
                              <p className="text-primary-700 mt-2 whitespace-pre-wrap">{response.feedback}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* Action Buttons */}
          <nav
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            aria-label="Interview result actions"
          >
            <button
              onClick={onNewInterview}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <Calendar className="h-5 w-5 mr-2" aria-hidden="true" />
              Start New Interview
            </button>

            <button
              onClick={() => alert('Download report functionality coming soon!')}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary-500 hover:text-primary-600 transition-all duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <Download className="h-5 w-5 mr-2" aria-hidden="true" />
              Download Report
            </button>

            <button
              onClick={() => alert('Share results functionality coming soon!')}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-primary-500 hover:text-primary-600 transition-all duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <Share2 className="h-5 w-5 mr-2" aria-hidden="true" />
              Share Results
            </button>
          </nav>
        </div>
      </div>
    </div><Footer /></>
  );
};
