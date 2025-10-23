import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>CONTACT US</h1>
        <p className={styles.subtitle}>
          Need an expert? You are more than welcomed to leave your contact info
          and we will be in touch shortly
        </p>
      </div>
    </section>
  );
}
