"use client";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState } from "react";
export default function Footer() {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    setMessage("Message sent successfully!");
  };
  const buttonHandle = () => {
    setMessage("Message sent successfully!");
    setShowMessage(!showMessage);
  };

  return (
    <footer className="bg-white dark:bg-gray-900  mt-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-20 bg-amber-50 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 pb-3 dark:text-white">
              Contact
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <EnvelopeIcon className="w-5 h-5" />
                contact@mealsharing.com
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <PhoneIcon className="w-5 h-5" />
                +45 12 34 56 78
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPinIcon className="w-5 h-5" />
                Copenhagen, Denmark
              </div>
            </div>
          </div>
          {/* Column 2: Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 pb-3 dark:text-white">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-600 hover:text-blue-600"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-600 hover:text-pink-500"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-600 hover:text-blue-400"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-gray-800 pb-3 dark:text-white">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Subscribe for updates and delicious news!
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                required
              />
              <button
                type="submit"
                onClick={buttonHandle}
                className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition"
              >
                Subscribe
              </button>
            </form>
            {showMessage && (
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
