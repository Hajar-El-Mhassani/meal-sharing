// components/MealCard.jsx
import styles from "./MealCard.module.css";

const MealCard = ({ meal }) => {
  return (
    <div className={styles.card}>
      <img src={meal.image} alt={meal.title} className={styles.image} />

      <div className={styles.content}>
        <h2 className={styles.title}>{meal.title}</h2>
        <p className={styles.description}>{meal.description}</p>
        <p>
          <span className={styles.label}>Date:</span>{" "}
          <span className={styles.secondary}>
            {new Date(meal.when).toLocaleDateString("en-EN")}
          </span>
        </p>
        <p>
          <span className={styles.label}>Location:</span>{" "}
          <span className={styles.secondary}>{meal.location}</span>
        </p>
        <p>
          <span className={styles.label}>Max reservation:</span>{" "}
          <span className={styles.secondary}>{meal.max_reservation}</span>
        </p>
        <p className={styles.price}>
          <strong>Price:</strong> ${meal.price}
        </p>
      </div>
    </div>
  );
};

export default MealCard;
