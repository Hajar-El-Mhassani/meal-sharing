"use client";
import AnimatedSection from "@/components/AnimatioSection/AnimatedSection";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll be in touch.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <AnimatedSection>
      <h1 className=" bg-meal-hero relative h-[60vh] flex items-center justify-center text-center text-white">
        Contact Us
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow rounded p-6 space-y-4"
      >
        <input
          className="w-full p-3 border rounded"
          type="text"
          name="name"
          value={form.name}
          placeholder="Your Name"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-3 border rounded"
          type="email"
          name="email"
          value={form.email}
          placeholder="Your Email"
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full p-3 border rounded"
          name="message"
          value={form.message}
          placeholder="Your Message"
          rows="5"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-3 rounded hover:bg-emerald-700 transition"
        >
          Send Message
        </button>
      </form>
    </AnimatedSection>
  );
}
