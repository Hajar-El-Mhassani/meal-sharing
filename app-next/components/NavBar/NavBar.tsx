"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { JSX } from "react";

// Define props for NavLink
interface NavLinkProps {
  href: string;
  label: string;
  mobile?: boolean;
}

// NavLink component
function NavLink({ href, label, mobile = false }: NavLinkProps): JSX.Element {
  const pathname = usePathname();

  // Determine if link is active
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  const baseClasses =
    "text-sm text-gray-800 dark:text-gray-200 hover:text-orange-400 dark:hover:text-orange-400 transition";

  const activeClasses =
    "text-orange-400 font-semibold dark:text-orange-400 border-b-2 border-orange-400";

  return (
    <Link
      href={href}
      className={
        mobile
          ? `block py-1 ${baseClasses} ${isActive ? activeClasses : ""}`
          : `${baseClasses} ${isActive ? activeClasses : ""}`
      }
    >
      {label}
    </Link>
  );
}

// Navbar component
export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="dark:bg-gray-900 fixed top-0 pb-1 left-0 w-full z-50 bg-white">
      <div className="pt-2 px-4 sm:px-6 lg:px-20 max-w-screen-xl mx-auto">
        <nav className="flex items-center justify-between h-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white"
          >
            <img
              src="/logo/logo3.PNG"
              alt="MealShare logo"
              className="w-25 h-10 object-contain"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-6">
            <NavLink href="/" label="Home" />
            <NavLink href="/meals" label="Meals" />
            <NavLink href="/about" label="About Us" />
            <NavLink href="/contact" label="Contact Us" />
            <NavLink href="/services" label="Services" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 font-extrabold dark:text-gray-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-3 pt-3 space-y-2">
          <NavLink href="/" label="Home" mobile />
          <NavLink href="/meals" label="Meals" mobile />
          <NavLink href="/about" label="About" mobile />
          <NavLink href="/contact" label="Contact" mobile />
          <NavLink href="/services" label="Services" mobile />
        </div>
      )}
    </header>
  );
}
