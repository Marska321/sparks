export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface UserProgress {
  displayName: string;
  email: string;
  level: number;
  badges: number;
  streak: number;
  ideasCreated: number;
  completedLessons: number[];
  currentLesson: number;
  isPaid: boolean;
  isAdmin?: boolean;
  lessonAnswers: Record<string, Record<string, string>>;
  lastLogin?: Date;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  tools: string[];
  writeAnswers?: string[];
  isReflection?: boolean;
  tip?: string;
}

export interface LessonContent {
  overview: string;
  checklist: string[];
  activities: Activity[];
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  sections: number;
  duration: string;
  icon: string;
  color: string;
  content?: LessonContent;
  completed?: boolean;
  current?: boolean;
  isPaid?: boolean;
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  lesson: number;
  earned?: boolean;
}

