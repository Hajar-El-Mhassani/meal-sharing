"use client";
import styles from "./ContactUs.module.css";
import ContactHero from "./ContactHero";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { SlEnvolope } from "react-icons/sl";
import { MdAddCall } from "react-icons/md";
export default function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true); // Just show message (no backend)
  };
  return (
    <>
      {/* Title Section */}
      <ContactHero />
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

      <section className={styles.contactPage}>
        {/* Form + Info */}
        <div className={styles.contactContainer}>
          {/* Left Form */}
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <h1 className={styles.h1}>Let's send us a message</h1>
            <div className={styles.row}>
              <input type="text" placeholder="First Name *" />
              <input type="text" placeholder=" Last Name *" />
            </div>
            <input type="email" placeholder="Email *" />
            <input type="text" placeholder="Subject *" />
            <textarea rows="5" placeholder="Your Message *"></textarea>
            <button type="submit">Send Message</button>
            {sent && (
              <p className={styles.successMessage}>
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Map */}
      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19807.5795552477!2d-0.12085089785784149!3d51.503324644195225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900c3c2c3%3A0x2b0f3a4e2d86e475!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v163143646"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}
