import styles from "./ContactUs.module.css";
import { FaHome } from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import { MdAddCall } from "react-icons/md";
import type { JSX } from "react";
export default function InfoCards(): JSX.Element {
  return (
    <section className={styles.contactInfoSection}>
      <div className={styles.infoCard}>
        <span className={styles.icon}>
          <FaHome />
        </span>
        <h3>VISIT US</h3>
        <p>You can find us at our main office:</p>
        <p className={styles.highlight}>
          MealSharing Building 1, Copenhagen, Denmark
        </p>
      </div>

      <div className={styles.infoCard}>
        <span className={styles.icon}>
          <MdAddCall />
        </span>
        <h3>CALL US</h3>
        <p>Our support team is available Mon–Fri, 9AM–6PM:</p>
        <p className={styles.highlight}>+45 75 63 73 92</p>
      </div>

      <div className={styles.infoCard}>
        <span className={styles.icon}>
          <SlEnvolope />
        </span>
        <h3>CONTACT US</h3>
        <p>Send us your questions or feedback anytime:</p>
        <p className={styles.highlight}>support@example.com</p>
      </div>
    </section>
  );
}
