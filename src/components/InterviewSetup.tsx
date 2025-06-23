import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Target,
  Briefcase,
  Building,
  Info,
} from "lucide-react";
import { InterviewConfig } from "../types/interview";

import { Footer } from "../components/Footer";

import { motion } from "framer-motion";

interface ExtendedInterviewConfig extends InterviewConfig {
  numQuestions: number;
}

interface InterviewSetupProps {
  onBack: () => void;
  onStart: (config: ExtendedInterviewConfig) => void;
}

const categoryIcons: Record<string, JSX.Element> = {
  technical: <Target className="h-5 w-5 text-primary-400 mr-2" />,
  behavioral: <Briefcase className="h-5 w-5 text-primary-400 mr-2" />,
  mixed: <Clock className="h-5 w-5 text-primary-400 mr-2" />,
};

export const InterviewSetup: React.FC<InterviewSetupProps> = ({
  onBack,
  onStart,
}) => {
  const [config, setConfig] = useState<ExtendedInterviewConfig>({
    duration: 30,
    category: "mixed",
    difficulty: "medium",
    jobRole: "",
    company: "",
    numQuestions: 5,
  });

  const getRoleCategory = (role: string) => {
    const techKeywords = [
      "software",
      "developer",
      "engineer",
      "programmer",
      "data",
      "backend",
      "frontend",
      "fullstack",
      "devops",
      "qa",
      "tester",
      "architect",
      "sysadmin",
      "it",
      "technology",
      "cloud",
      "machine learning",
      "ai",
    ];
    const marketingKeywords = [
      "marketing",
      "seo",
      "content",
      "brand",
      "advertising",
      "digital marketing",
      "social media",
      "growth",
      "product marketing",
    ];
    const salesKeywords = [
      "sales",
      "account",
      "business development",
      "bdm",
      "client",
      "customer success",
      "crm",
    ];
    const retailFoodServiceKeywords = [
      "store",
      "retail",
      "cashier",
      "sales associate",
      "mcdonalds",
      "restaurant",
      "waiter",
      "waitress",
      "server",
      "barista",
      "food service",
      "fast food",
      "grocery",
      "stock clerk",
      "warehouse",
    ];

    const lowerRole = role.toLowerCase();

    if (techKeywords.some((kw) => lowerRole.includes(kw))) return "technical";
    if (marketingKeywords.some((kw) => lowerRole.includes(kw)))
      return "marketing";
    if (salesKeywords.some((kw) => lowerRole.includes(kw))) return "sales";
    if (retailFoodServiceKeywords.some((kw) => lowerRole.includes(kw)))
      return "behavioral";

    return "other";
  };

  const filteredCategories = useMemo(() => {
    if (!config.jobRole.trim()) {
      return [
        {
          value: "technical",
          label: "Technical",
          desc: "Coding, algorithms, system design",
        },
        {
          value: "behavioral",
          label: "Behavioral",
          desc: "Soft skills, past experiences",
        },
        {
          value: "mixed",
          label: "Mixed",
          desc: "Combination of technical and behavioral",
        },
      ];
    }

    const roleCategory = getRoleCategory(config.jobRole);

    switch (roleCategory) {
      case "technical":
        return [
          {
            value: "technical",
            label: "Technical",
            desc: "Coding, algorithms, system design",
          },
          {
            value: "mixed",
            label: "Mixed",
            desc: "Combination of technical and behavioral",
          },
        ];
      case "marketing":
      case "sales":
        return [
          {
            value: "behavioral",
            label: "Behavioral",
            desc: "Soft skills, past experiences",
          },
          {
            value: "mixed",
            label: "Mixed",
            desc: "Combination of technical and behavioral",
          },
        ];
      case "behavioral":
        return [
          {
            value: "behavioral",
            label: "Behavioral",
            desc: "Customer service, teamwork, situational questions",
          },
          {
            value: "mixed",
            label: "Mixed",
            desc: "Combination of technical and behavioral",
          },
        ];
      default:
        return [
          {
            value: "technical",
            label: "Technical",
            desc: "Coding, algorithms, system design",
          },
          {
            value: "behavioral",
            label: "Behavioral",
            desc: "Soft skills, past experiences",
          },
          {
            value: "mixed",
            label: "Mixed",
            desc: "Combination of technical and behavioral",
          },
        ];
    }
  }, [config.jobRole]);

  useEffect(() => {
    if (!filteredCategories.find((cat) => cat.value === config.category)) {
      setConfig((c) => ({ ...c, category: filteredCategories[0].value }));
    }
  }, [filteredCategories, config.category]);

  const handleStart = () => onStart(config);

  const baseButtonClasses = `p-2 rounded-lg border-2 text-center text-sm transition-all
    focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 focus:ring-offset-gray-900
    dark:focus:ring-offset-gray-800`;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonTapScale = { scale: 0.95 };
  const buttonHoverScale = { scale: 1.05 };
  const startBtnHover = {
    scale: [1, 1.1, 1],
    transition: { duration: 0.4, repeat: Infinity, repeatType: "loop" },
  };

  // Color theme for selected buttons in dark mode
  const selectedBg = "bg-indigo-700";
  const selectedBorder = "border-indigo-500";
  const selectedText = "text-indigo-200";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-gray-100 dark:text-gray-200">
      <main className="flex-grow flex justify-center items-center p-6">
        <motion.div
          className="bg-gray-800 rounded-3xl shadow-xl p-8 pb-28 relative w-full max-w-[1100px] max-h-[840px] flex flex-col"
          style={{ minHeight: "820px" }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Back button */}
          <motion.button
            onClick={onBack}
            className="flex items-center text-gray-300 hover:text-indigo-300 transition-colors mb-6 self-start focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 focus:ring-offset-gray-900"
            aria-label="Back to Home"
            whileHover={buttonHoverScale}
            whileTap={buttonTapScale}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </motion.button>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-indigo-200 mb-1">
              Customize Your Interview
            </h2>
            <p className="text-base text-indigo-300">
              Let's set up your mock interview for the best practice experience
            </p>
          </div>

          {/* Form grid */}
          <div className="grid grid-cols-2 grid-rows-[auto_auto_auto_auto_auto_auto] gap-8 overflow-visible flex-grow">
            {/* Duration */}
            <div className="space-y-2 border-b border-indigo-700 pb-4">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-indigo-400 mr-2" />
                <label className="text-lg font-semibold">
                  Interview Duration
                </label>
                <Info
                  className="ml-1 h-4 w-4 text-indigo-300 cursor-pointer"
                  title="Select how long the interview will last"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[15, 30, 45, 60].map((duration) => (
                  <motion.button
                    key={duration}
                    onClick={() => setConfig({ ...config, duration })}
                    className={`${baseButtonClasses} ${
                      config.duration === duration
                        ? `${selectedBorder} ${selectedBg} ${selectedText}`
                        : "border-gray-600 hover:border-indigo-500 text-gray-300 hover:text-indigo-300"
                    }`}
                    aria-pressed={config.duration === duration}
                    aria-label={`${duration} minute duration`}
                    whileHover={buttonHoverScale}
                    whileTap={buttonTapScale}
                    layout
                    type="button"
                  >
                    {duration} min
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Number of Questions */}
            <div className="space-y-2 border-b border-indigo-700 pb-4">
              <div className="flex items-center mb-2">
                <Target className="h-5 w-5 text-indigo-400 mr-2" />
                <label className="text-lg font-semibold">
                  Number of Questions
                </label>
                <Info
                  className="ml-1 h-4 w-4 text-indigo-300 cursor-pointer"
                  title="Select how many questions you want"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[3, 5, 7, 10].map((num) => (
                  <motion.button
                    key={num}
                    onClick={() => setConfig({ ...config, numQuestions: num })}
                    className={`${baseButtonClasses} ${
                      config.numQuestions === num
                        ? `${selectedBorder} ${selectedBg} ${selectedText}`
                        : "border-gray-600 hover:border-indigo-500 text-gray-300 hover:text-indigo-300"
                    }`}
                    aria-pressed={config.numQuestions === num}
                    aria-label={`${num} questions`}
                    whileHover={buttonHoverScale}
                    whileTap={buttonTapScale}
                    layout
                    type="button"
                  >
                    {num}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category - spans two columns */}
            <div className="space-y-2 border-b border-indigo-700 pb-4 col-span-2">
              <div className="flex items-center mb-2">
                <Building className="h-5 w-5 text-indigo-400 mr-2" />
                <label className="text-lg font-semibold">Category</label>
                <Info
                  className="ml-1 h-4 w-4 text-indigo-300 cursor-pointer"
                  title="Choose the category of questions"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {filteredCategories.map(({ value, label, desc }) => (
                  <motion.button
                    key={value}
                    onClick={() => setConfig({ ...config, category: value })}
                    className={`${baseButtonClasses} flex flex-col items-start p-4 ${
                      config.category === value
                        ? `${selectedBorder} ${selectedBg} ${selectedText}`
                        : "border-gray-600 hover:border-indigo-500 text-gray-300 hover:text-indigo-300"
                    }`}
                    aria-pressed={config.category === value}
                    aria-label={label}
                    whileHover={buttonHoverScale}
                    whileTap={buttonTapScale}
                    layout
                    type="button"
                  >
                    <div className="flex items-center mb-1">
                      {categoryIcons[value] || null}
                      <span className="font-semibold">{label}</span>
                    </div>
                    <p className="text-xs text-indigo-300">{desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Difficulty - spans two columns */}
            <div className="space-y-2 border-b border-indigo-700 pb-4 col-span-2">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-indigo-400 mr-2" />
                <label className="text-lg font-semibold">Difficulty</label>
                <Info
                  className="ml-1 h-4 w-4 text-indigo-300 cursor-pointer"
                  title="Select the difficulty level"
                />
              </div>
              <div className="grid grid-cols-3 gap-6">
                {["easy", "medium", "hard"].map((diff) => (
                  <motion.button
                    key={diff}
                    onClick={() => setConfig({ ...config, difficulty: diff })}
                    className={`${baseButtonClasses} capitalize ${
                      config.difficulty === diff
                        ? `${selectedBorder} ${selectedBg} ${selectedText}`
                        : "border-gray-600 hover:border-indigo-500 text-gray-300 hover:text-indigo-300"
                    }`}
                    aria-pressed={config.difficulty === diff}
                    aria-label={diff}
                    whileHover={buttonHoverScale}
                    whileTap={buttonTapScale}
                    layout
                    type="button"
                  >
                    {diff}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Optional Details side-by-side */}
            <div className="col-span-2 border-b border-indigo-700 pb-4 grid grid-cols-2 gap-x-6 gap-y-4">
              {/* Job Role */}
              <div className="space-y-2">
                <label
                  htmlFor="jobRole"
                  className="flex items-center font-semibold text-lg"
                >
                  <Briefcase className="h-5 w-5 mr-2 text-indigo-400" />
                  Job Role (Optional)
                  <Info
                    className="ml-1 h-4 w-4 text-indigo-300 cursor-pointer"
                    title="Helps us tailor your interview questions"
                  />
                </label>
                <input
                  id="jobRole"
                  type="text"
                  value={config.jobRole}
                  onChange={(e) =>
                    setConfig({ ...config, jobRole: e.target.value })
                  }
                  className="w-full rounded-md border border-indigo-600 bg-gray-900 px-4 py-2 text-gray-200 placeholder-gray-400 focus:border-indigo-400 focus:outline-none"
                  placeholder="e.g., Software Engineer"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="flex items-center font-semibold text-lg"
                >
                  <Building className="h-5 w-5 mr-2 text-indigo-400" />
                  Company (Optional)
                  <Info
                    className="ml-1 h-4 w-4 text-indigo-300 cursor-pointer"
                    title="We might customize questions based on company"
                  />
                </label>
                <input
                  id="company"
                  type="text"
                  value={config.company}
                  onChange={(e) =>
                    setConfig({ ...config, company: e.target.value })
                  }
                  className="w-full rounded-md border border-indigo-600 bg-gray-900 px-4 py-2 text-gray-200 placeholder-gray-400 focus:border-indigo-400 focus:outline-none"
                  placeholder="e.g., Google"
                />
              </div>
            </div>
          </div>

          {/* Summary + Start Button inside same container, sticky at bottom */}
          <motion.div className="px-8 py-4 flex items-center justify-between rounded-b-3xl">
            <div className="text-indigo-300 font-semibold text-sm">
              Interview: {config.duration} Min. - {config.numQuestions} Questions -{" "}
              {config.category.charAt(0).toUpperCase() +
                config.category.slice(1)}
              {" "} - Difficulty: {config.difficulty.toUpperCase()}
            </div>
            <motion.button
              onClick={handleStart}
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800 hover:from-purple-700 hover:via-indigo-700 hover:to-indigo-900 active:from-purple-800 active:via-indigo-800 active:to-indigo-900 text-white font-bold px-6 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 focus:ring-offset-gray-900"
              whileHover={startBtnHover}
              whileTap={{ scale: 0.95 }}
              type="button"
              aria-label="Start Interview"
            >
              Start Interview
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
