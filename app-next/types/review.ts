/** This blueprint is returned by the backend API */
export interface ReviewApi {
  review_id: number;
  meal_id: number;
  review_title: string;
  review_description: string;
  stars: number;
  created_date: string;
}

/** This blueprint is used by the frontend */
export interface Review {
  id: number;
  mealId: number;
  title: string;
  description: string;
  stars: number;
  createdDate: string;
}
