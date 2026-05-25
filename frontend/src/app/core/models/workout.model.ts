export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface WorkoutLog {
  id?: string;
  exercise?: Exercise;
  exerciseId?: string;
  exerciseName?: string; // Optional for display
  sets: number;
  reps: number;
  weight: number;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  date: string;
  durationMinutes: number;
  notes: string;
  logs: WorkoutLog[];
}

export interface WorkoutSessionCreateRequest {
  userId: string;
  date: string;
  durationMinutes: number;
  notes: string;
  logs: {
    exerciseId: string;
    sets: number;
    reps: number;
    weight: number;
  }[];
}
