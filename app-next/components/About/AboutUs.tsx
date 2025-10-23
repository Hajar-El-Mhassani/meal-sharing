import React from "react";

const sections: { title: string; content: string }[] = [
  {
    title: "Who We Are",
    content: `We are an innovative meal-sharing platform that connects passionate home cooks with people looking to discover authentic food experiences. Our platform empowers hosts to share their recipes, stories, and cultures through food. Whether you’re a host or a guest, we help you create memories around the table.`,
  },
  {
    title: "What We Do",
    content: `Our platform enables users to host meals, discover nearby dining experiences, leave reviews, and explore new cultures. We make meal sharing easy, safe, and enjoyable for everyone, whether you're a foodie, a traveler, or just curious about your local community.`,
  },
  {
    title: "Our Values",
    content: `We believe in authenticity, community, accessibility, and sustainability. We promote honest food made with love, encourage inclusive experiences, support local sourcing, and work to reduce food waste across the board.`,
  },
  {
    title: "Safety & Trust",
    content: `We ensure verified profiles, secure booking and payment systems, and transparent reviews. Our support team is always available to help with any concerns, ensuring a safe and trustworthy platform for both guests and hosts.`,
  },
  {
    title: "Our Mission",
    content: `To build meaningful human connections through food. We envision a world where people gather, learn, and grow by sharing meals, crossing cultural boundaries and discovering unity through diversity.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-12  bg-white py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className=" overflow-hidden shadow-md rounded-2xl bg-orange-50"
            >
              {/* Header */}
              <div className=" text-black px-6 py-2 text-lg font-semibold">
                {section.title.toUpperCase()}
              </div>

              {/* Content */}
              <div className="px-6 py-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
