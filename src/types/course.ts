export interface Course {
  id: string;
  title: string;
  description?: string;
  modules: CourseModule[];
  status: CourseStatus;
  visibility: CourseVisibility;
  enrollment_type: EnrollmentType;
  pass_threshold: number; // percentage
  max_attempts?: number;
  expires_at?: string;
  created_by: string;
  organization_id?: string;
  customer_access: string[]; // customer IDs that can access this course
  enrollment_count: number;
  completion_count: number;
  average_score?: number;
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order: number;
  lessons: CourseLesson[];
  created_at: string;
  updated_at: string;
}

export interface CourseLesson {
  id: string;
  module_id: string;
  video_id?: string;
  title: string;
  description?: string;
  order: number;
  duration: number; // in seconds
  lesson_type: LessonType;
  quiz?: Quiz;
  created_at: string;
  updated_at: string;
}

export type CourseStatus = 'draft' | 'published' | 'archived';
export type CourseVisibility = 'public' | 'internal' | 'customer_specific' | 'private';
export type EnrollmentType = 'open' | 'invite_only' | 'manual';
export type LessonType = 'video' | 'quiz' | 'text' | 'assignment';

export interface Quiz {
  id: string;
  lesson_id: string;
  title: string;
  description?: string;
  time_limit?: number; // in minutes
  pass_threshold: number; // percentage
  max_attempts?: number;
  questions: QuizQuestion[];
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  question_type: QuestionType;
  options?: string[]; // for multiple choice
  correct_answer: string | string[]; // single answer or multiple correct answers
  explanation?: string;
  order: number;
  points: number;
  created_at: string;
  updated_at: string;
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'text_input' | 'multiple_select';

export interface CourseEnrollment {
  id: string;
  course_id: string;
  user_id: string;
  status: EnrollmentStatus;
  progress_percentage: number;
  current_module_id?: string;
  current_lesson_id?: string;
  started_at: string;
  completed_at?: string;
  last_accessed_at: string;
  created_at: string;
  updated_at: string;
}

export type EnrollmentStatus = 'enrolled' | 'in_progress' | 'completed' | 'failed' | 'dropped';

export interface CourseProgress {
  id: string;
  enrollment_id: string;
  lesson_id: string;
  status: LessonStatus;
  score?: number;
  attempts: number;
  time_spent: number; // in seconds
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export type LessonStatus = 'not_started' | 'in_progress' | 'completed' | 'failed';

export interface Certificate {
  id: string;
  course_id: string;
  user_id: string;
  certificate_number: string;
  issued_at: string;
  expires_at?: string;
  verification_url: string;
  pdf_url: string;
  created_at: string;
}

export interface CreateCourseInput {
  title: string;
  description?: string;
  visibility: CourseVisibility;
  enrollment_type: EnrollmentType;
  pass_threshold: number;
  max_attempts?: number;
  expires_at?: string;
  organization_id?: string;
  customer_access?: string[];
}

export interface UpdateCourseInput {
  id: string;
  title?: string;
  description?: string;
  status?: CourseStatus;
  visibility?: CourseVisibility;
  enrollment_type?: EnrollmentType;
  pass_threshold?: number;
  max_attempts?: number;
  expires_at?: string;
  customer_access?: string[];
}
