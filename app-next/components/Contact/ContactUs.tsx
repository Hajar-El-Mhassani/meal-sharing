"use client";
import { useState } from "react";
import styles from "./ContactUs.module.css";

import type { JSX } from "react";
export default function Contact(): JSX.Element {
  const [sent, setSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSent(true); // Just show message (no backend)
  };

  return (
    <>
      {/* Title Section */}
      <section className={styles.contactPage}>
        {/* Form */}
        <div className={styles.contactContainer}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <h1 className={styles.h1}>Let's send us a message</h1>

            <div className={styles.row}>
              <input type="text" placeholder="First Name *" />
              <input type="text" placeholder="Last Name *" />
            </div>

            <input type="email" placeholder="Email *" />
            <input type="text" placeholder="Subject *" />
            <textarea rows={5} placeholder="Your Message *" />

            <button type="submit">Send Message</button>

            {sent && (
              <p className={styles.successMessage}>
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
