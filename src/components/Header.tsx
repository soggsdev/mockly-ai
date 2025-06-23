import React from "react";
import { Brain, ChevronRightCircle, Menu, Play, X } from "lucide-react";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <header className="bg-gray-900 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
              <img
                src="/public/mockly-logo-white.png"
                height="100px"
                width="100px"
              ></img>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"></h1>
              <p className="text-xs text-gray-300">
                Powerful AI-Powered Interviews
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-600 bg-[length:200%_200%] animate-gradient-x transition-all duration-300 hover:brightness-125"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-400 bg-[length:200%_200%] animate-gradient-x transition-all duration-300 hover:brightness-125"
            >
              How it Works
            </a>
            {/* <button 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
             <ChevronRightCircle/>
            </button> */}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-up">
          <div className="px-4 py-4 space-y-4">
            <a
              href="#features"
              className="block text-gray-600 hover:text-primary-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block text-gray-600 hover:text-primary-600 transition-colors"
            >
              How it Works
            </a>
            <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200">
              Start Interview
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
