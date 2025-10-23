import "./globals.css";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import type { ReactNode } from "react";
export const metadata = {
  title: "Meal Sharing App - Meals, Events, Restaurants, and More",
};

// Define props for RootLayout
interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NavBar />
        <main className="pt-15 px-4 sm:px-6 flex-grow lg:px-20 max-w-screen-xl mx-auto ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
