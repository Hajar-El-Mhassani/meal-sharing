// components/MealCard.jsx
import styles from "./MealCard.module.css";

const MealCard = (meal) => {
  return (
    <article className={styles.meal}>
      <img
        src="/meals/image.png"
        alt={meal.title}
        className={styles.mealImage}
      />
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p>
        <strong>Date: </strong>
        {new Date(meal.when).toLocaleDateString("en-EN")}
      </p>
      <p>
        <strong>Location: </strong>
        {meal.location}
      </p>
      <p>
        <strong>Max reservation: </strong> {meal.max_reservation}
      </p>
      <p>
        <strong>Price:</strong> {meal.price}
      </p>
    </article>
  );
};

export default MealCard;
