import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
export const metadata = {
  title: "Meal Sharing App - Meals, Events, Restaurants, and More",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="pt-15 px-4 sm:px-6 lg:px-20 max-w-screen-xl mx-auto ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
