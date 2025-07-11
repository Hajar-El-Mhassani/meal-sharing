"use client";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatioSection/AnimatedSection";
const services = [
  {
    title: "Reserve a Meal",
    description:
      "Find and join shared meals in your area. Meet new people, explore different cultures, and enjoy good company around the table.",
    image: "/icons/booking.jpeg",
    bg: "bg-orange-100",
  },
  {
    title: "Leave Reviews",
    description:
      "Share your experience and help others choose the best meals and hosts. Your feedback improves the whole community.",
    image: "/icons/leave.jpeg",
    bg: "bg-lime-100",
  },
  {
    title: "Host a Meal",
    description:
      "Share your love for cooking by hosting guests in your home. Create memorable experiences with your homemade dishes.",
    image: "/icons/host.jpeg",
    bg: "bg-yellow-100",
  },
  {
    title: "Extra Services",
    description:
      "Need help with private dining, themed events, or group bookings? We offer tailored services to match your needs",
    image: "/icons/extra.jpeg",
    bg: "bg-green-100",
  },
];

export default function ServicesGrid() {
  return (
    <>
      <section className=" bg-meal-hero relative h-[60vh] flex items-center justify-center text-center text-white">
        <div className="bg-lime-600/30 w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Discover <span className="text-orange-400">Our Services</span>{" "}
          </h1>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6  py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex items-center p-10 rounded-xl ${service.bg} gap-10`}
            >
              <div className="w-16 h-16 flex-shrink-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={64}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                <p className="text-gray-700 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
