export interface Question {
  id: string;
  text: string;
  category: 'technical' | 'behavioral' | 'situational' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  followUps?: string[];
}

export interface InterviewSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  questions: Question[];
  responses: Array<{
    questionId: string;
    answer: string;
    feedback?: string;
    score?: number;
  }>;
  overallScore?: number;
  feedback?: string;
}

export interface InterviewConfig {
  duration: number; // in minutes
  category: 'technical' | 'behavioral' | 'mixed';
  difficulty: 'easy' | 'medium' | 'hard';
  jobRole?: string;
  company?: string;
}