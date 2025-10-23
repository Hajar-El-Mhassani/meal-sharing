import styles from "./ContactUs.module.css";
import type { JSX } from "react";
export default function Iframe(): JSX.Element {
  return (
    <>
      {/* Map */}
      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19807.5795552477!2d-0.12085089785784149!3d51.503324644195225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900c3c2c3%3A0x2b0f3a4e2d86e475!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v163143646"
          width="100%"
          height={350}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </>
  );
}
