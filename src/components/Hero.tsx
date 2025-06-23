import React, { useState, useEffect } from "react";
import {
  ChevronRightCircle,
  ChevronUp,
  ChevronDown,
  Pen,
  Play,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "../components/Footer";
import { FadeSection } from "../components/FadeSection";

interface HeroProps {
  onStartInterview: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const rotatingWords = [
  "Job Interview",
  "Presentation",
  "Pitch",
  "Negotiation",
  "Product Demo",
  "Sales Call",
  "Leadership Talk",
  "Networking Event",
];

const floatingDots = [
  { size: 6, left: "10%", delay: 0, speed: 30, parallax: 5 },
  { size: 4, left: "25%", delay: 1500, speed: 40, parallax: 8 },
  { size: 5, left: "40%", delay: 3000, speed: 35, parallax: 6 },
  { size: 3, left: "60%", delay: 1000, speed: 45, parallax: 9 },
  { size: 7, left: "75%", delay: 2500, speed: 25, parallax: 4 },
  { size: 4, left: "85%", delay: 3500, speed: 50, parallax: 10 },
];

const CollapsibleFAQ: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}> = ({ question, answer, isOpen, onClick }) => (
  <motion.div
    initial={false}
    animate={{ backgroundColor: isOpen ? "#1f2937" : "#111827" }}
    className="rounded-xl border border-gray-700 overflow-hidden shadow-md"
  >
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center px-6 py-4 text-left text-white focus:outline-none transition-colors duration-10 ${
        isOpen ? "hover:none" : "hover:bg-gray-800"
      }`}
      aria-expanded={isOpen}
      aria-controls={`faq-content-${question}`}
      id={`faq-header-${question}`}
    >
      <span className="font-medium">{question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="text-gray-400"
      >
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          id={`faq-content-${question}`}
          role="region"
          aria-labelledby={`faq-header-${question}`}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="px-6 pb-4 text-gray-300 text-sm overflow-hidden"
          style={{ overflow: "hidden" }}
          layout
        >
          {answer}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export const Hero: React.FC<HeroProps> = ({ onStartInterview }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isBlinking, setIsBlinking] = useState(true);
  const [mouseX, setMouseX] = useState(0);

  // FAQ open index state for accordion behavior
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is this suitable for beginners?",
      answer:
        "Absolutely! Our AI adjusts question difficulty based on your experience level to help you improve steadily.",
    },
    {
      question: "Can I practice for multiple job roles?",
      answer:
        "Yes, you can select different roles and industries to tailor your interview practice sessions accordingly.",
    },
    {
      question: "How does the feedback work?",
      answer:
        "After each mock interview, you receive instant, detailed feedback highlighting strengths and areas to improve.",
    },
    {
      question: "Is my data secure?",
      answer:
        "We take your privacy seriously. Your data is encrypted and never shared without your permission.",
    },
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = rotatingWords[wordIndex];

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        setIsBlinking(false);
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        setIsBlinking(true);
        timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(50);
          setIsBlinking(false);
        }, 1500);
      }
    } else {
      if (displayedText.length > 0) {
        setIsBlinking(false);
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, typingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setTypingSpeed(150);
        setIsBlinking(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex, typingSpeed]);

  // Mouse move for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <FadeSection>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start bg-gradient-to-br from-primary-900 via-gray-900 to-secondary-900">
          {/* Floating dots */}
          <div className="absolute inset-0 pointer-events-none">
            {floatingDots.map(({ size, left, delay, speed, parallax }, idx) => {
              // Parallax offset based on mouseX relative to center of screen
              const centerX = window.innerWidth / 2;
              const offsetX = ((mouseX - centerX) / centerX) * parallax;

              return (
                <div
                  key={idx}
                  className="absolute rounded-full bg-primary-400 opacity-40 filter blur-sm"
                  style={{
                    width: size * 4,
                    height: size * 4,
                    left,
                    animation: `floatY ${speed}s ease-in-out ${delay}ms infinite alternate`,
                    transform: `translateX(${offsetX}px)`,
                  }}
                />
              );
            })}
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-purple-400 mr-2" />
              <span className="text-purple-400 font-semibold text-lg">
                AI-Powered Interview Preparation
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight select-none">
              Master Your Next
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block min-h-[1rem]">
                {displayedText}
                <span
                  className={`inline-block ml-1 w-[2px] h-[1.2em] bg-gray- ${
                    isBlinking ? "animate-blink" : ""
                  }`}
                  style={{ verticalAlign: "top" }}
                />
              </span>
            </h1>

            <p
             id="features"
              className="text-xl text-gray-300 mb-10 mt-10 max-w-3xl mx-auto leading-relaxed select-none"
            >
              Practice with AI-generated questions, receive instant feedback,
              and build confidence for your dream job interview.
            </p>

            <button
              onClick={onStartInterview}
              className="group bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mx-auto"
            >
              Start Mock Interview
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16 px-4 mb-16">
              {[
                {
                  icon: <Target className="h-6 w-6 text-white" />,
                  title: "Targeted Questions",
                  desc: "AI generates questions specific to your role and industry.",
                  bg: "bg-primary-900",
                  ring: "hover:ring-primary-500",
                },
                {
                  icon: <Pen className="h-6 w-6 text-white" />,
                  title: "Instant Feedback",
                  desc: "Get real-time analysis and improvement suggestions.",
                  bg: "bg-secondary-900",
                  ring: "hover:ring-secondary-500",
                },
                {
                  icon: <TrendingUp className="h-6 w-6 text-white" />,
                  title: "Track Progress",
                  desc: "Monitor your improvement over time with detailed analytics.",
                  bg: "bg-green-900",
                  ring: "hover:ring-success-500",
                },
                {
                  icon: <Play className="h-6 w-6 text-white" />,
                  title: "Custom Mock Sessions",
                  desc: "Tailor difficulty, tone, and style of your interview to match real-world scenarios.",
                  bg: "bg-gray-500",
                  ring: "hover:ring-warning-500",
                },
                {
                  icon: <Sparkles className="h-6 w-6 text-white" />,
                  title: "Powered by ChatGPT",
                  desc: "Leverages the latest language model to provide realistic interviewer behavior.",
                  bg: "bg-indigo-900",
                  ring: "hover:ring-indigo-500",
                },
                {
                  icon: <Target className="h-6 w-6 text-white" />,
                  title: "Personalized Feedback",
                  desc: "Receive tips tailored to your strengths and weaknesses after each session.",
                  bg: "bg-pink-900",
                  ring: "hover:ring-pink-500",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className={`group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl ${card.ring} ring-offset-1 min-h-[220px]`}
                >
                  <div
                    className={`${card.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto transition-transform duration-300 group-hover:rotate-6`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 text-center">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-sm text-center">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* How It Works Section */}
      <FadeSection delay={0.2}>
        <section
          className="py-24 bg-gray-900 relative z-10 snap-start mt-20"
          id="how-it-works"
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            {/* Define SVG gradient once */}
            <svg className="hidden">
              <defs>
                <linearGradient
                  id="purpleToBlueGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#7c3aed" /> {/* purple */}
                  <stop offset="100%" stopColor="#3b82f6" /> {/* blue */}
                </linearGradient>
              </defs>
            </svg>

            <h2 className="text-4xl font-bold mb-6 text-white">How It Works</h2>

            {/* Progress Bar */}
            <div className="max-w-7xl mx-auto px-4 mb-20">
              <div className="flex justify-between items-center relative">
                {["Simple", "Proficient", "Encouragement"].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex-1 relative flex flex-col items-center text-center z-20"
                  >
                    {/* Circle */}
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center z-30 shadow-lg">
                      {idx + 1}
                    </div>
                    {/* Label */}
                    <p className="mt-2 text-sm text-gray-400">{step}</p>
                  </div>
                ))}

                {/* Connector line */}
                <div
                  className="absolute top-3.5 left-4 right-4 h-1 rounded z-10"
                  style={{
                    background: "linear-gradient(to right, #7c3aed, #3b82f6)",
                  }}
                ></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Target className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Select Role & Preferences
                </h3>
                <p className="text-gray-300 max-w-sm mx-auto">
                  Choose your desired job role, experience level, and preferred
                  interview style.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center mb-4">
                  <Play className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Interactive Mock Interview
                </h3>
                <p className="text-gray-300 max-w-sm mx-auto">
                  Engage with AI-driven questions that simulate real interview
                  scenarios.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Get Actionable Feedback
                </h3>
                <p className="text-gray-300 max-w-sm mx-auto">
                  Receive personalized feedback to improve your skills and boost
                  confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* FAQ Section - Interactive & Collapsible */}
      <FadeSection delay={0.2}>
        <section className="py-20 bg-gray-900 text-white snap-start mb-5">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((item, idx) => (
                <CollapsibleFAQ
                  key={idx}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === idx}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* Footer directly below FAQ, no gap */}
      <Footer />

      {/* Global Styles */}
      <style>{`
        @keyframes floatY {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(15px);
          }
        }
        @keyframes blink {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          25%,
          75% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1.2s infinite;
        }
      `}</style>
    </>
  );
};
