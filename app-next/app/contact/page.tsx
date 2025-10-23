import React from "react";
import ContactHero from "../../components/Contact/ContactHero";
import Contact from "../../components/Contact/ContactUs";
import InfoCards from "../../components/Contact/InfoCards";
import Iframe from "../../components/Contact/Iframe";

export default function ContactUs() {
  return (
    <>
      <ContactHero />
      <InfoCards />
      <Contact />
      <Iframe />
    </>
  );
}
