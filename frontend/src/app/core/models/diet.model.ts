export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

export interface MealLogItem {
  id?: string;
  food?: Food;
  foodId?: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealLog {
  id: string;
  userId: string;
  date: string;
  mealType: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  items: MealLogItem[];
}

export interface MealLogCreateRequest {
  userId: string;
  date: string;
  mealType: string;
  items: {
    foodId: string;
    servings: number;
  }[];
}
