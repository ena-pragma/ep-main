import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "About", path: "/#about" },
    { label: "Services", path: "/#services" },
    { label: "Case Studies", path: "/#case-studies" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/#contact" },
  ];

  const handleClick = (path: string) => {
    setIsOpen(false);
    if (path.startsWith("/#") && location.pathname === "/") {
      const element = document.querySelector(path.substring(1));
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              ENA PRAGMA
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => handleClick(item.path)}
                className="text-gray-800 hover:text-gray-600 transition-colors px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute w-full bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => handleClick(item.path)}
                  className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-gray-600 hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}