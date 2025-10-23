/**  READ a reservation */
export interface Reservation {
  id: number;
  meal_id: number;
  number_of_guests: number;
  contact_phonenumber: string;
  contact_name: string;
  contact_email: string;
  create_date: string; // ISO date string from API
}

/** create a reservation */
export interface ReservationCreate {
  meal_id: number;
  number_of_guests: number;
  contact_phonenumber: string;
  contact_name: string;
  contact_email: string;
}

/** API success response after create */
export interface ReservationCreateResponse {
  ok: true;
  reservationId?: string;
}

/** API error shape */
export interface ApiError {
  message: string;
}
