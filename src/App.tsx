import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InterviewSetup } from './components/InterviewSetup';
import { InterviewSession } from './components/InterviewSession';
import { InterviewResults } from './components/InterviewResults';
import { InterviewConfig, InterviewSession as IInterviewSession } from './types/interview';

type AppState = 'home' | 'setup' | 'interview' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | null>(null);
  const [completedSession, setCompletedSession] = useState<IInterviewSession | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStartInterview = () => {
    setCurrentState('setup');
  };

  const handleSetupComplete = (config: InterviewConfig) => {
    setInterviewConfig(config);
    setCurrentState('interview');
  };

  const handleInterviewComplete = (session: IInterviewSession) => {
    setCompletedSession(session);
    setCurrentState('results');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setInterviewConfig(null);
    setCompletedSession(null);
  };

  const handleNewInterview = () => {
    setCurrentState('setup');
    setCompletedSession(null);
  };

  if (currentState === 'setup') {
    return (
      <InterviewSetup
        onBack={handleBackToHome}
        onStart={handleSetupComplete}
      />
    );
  }

  if (currentState === 'interview' && interviewConfig) {
    return (
      <InterviewSession
        config={interviewConfig}
        onBack={handleBackToHome}
        onComplete={handleInterviewComplete}
      />
    );
  }

  if (currentState === 'results' && completedSession) {
    return (
      <InterviewResults
        session={completedSession}
        onBack={handleBackToHome}
        onNewInterview={handleNewInterview}
      />
    );
  }

  // Home state
  return (
    <div className="min-h-screen bg-gray-900">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero onStartInterview={handleStartInterview} />
    </div>
  );
}

export default App;