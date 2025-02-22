export interface Student {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface Grade {
  id: string;
  student_id: string;
  subject: string;
  score: number;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export type UserType = 'student' | 'parent' | 'teacher';

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
}