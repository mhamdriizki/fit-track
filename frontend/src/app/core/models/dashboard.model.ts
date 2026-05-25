export interface DailySummary {
  userId: string;
  date: string;
  currentWeight: number;
  targetWeight: number;
  totalWorkoutDurationMinutes: number;
  totalWorkouts: number;
  totalCaloriesConsumed: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}
