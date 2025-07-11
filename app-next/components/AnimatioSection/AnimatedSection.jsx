// components/AnimatedSection.jsx
"use client";
import { motion } from "framer-motion";

export default function AnimatedSection({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto p-6"
    >
      {children}
    </motion.section>
  );
}
