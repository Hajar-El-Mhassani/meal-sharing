export interface Meal {
  id: number;
  title: string;
  description: string;
  when: string;
  location: string;
  max_reservation: number;
  available_reservations: number;
  price: number;
  image: string;
}
