import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  useEffect(() => {
    if (pendingScroll && location.pathname === "/") {
      const element = document.querySelector(pendingScroll);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setPendingScroll(null);
      }
    }
  }, [location.pathname, pendingScroll]);

  const menuItems = [
    { label: "About", path: "/#about" },
    { label: "Services", path: "/#services" },
    // { label: "Web Design", path: "/web-design" },
    { label: "Case Studies", path: "/#case-studies" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/#contact" },
  ];

  const handleClick = (path: string) => {
    setIsOpen(false);

    if (path === "/web-design" || path === "/blog") {
      window.scrollTo(0, 0);
      navigate(path);
      return;
    }

    if (path.startsWith("/#")) {
      if (location.pathname !== "/") {
        setPendingScroll(path.substring(1));
        navigate("/");
      } else {
        const element = document.querySelector(path.substring(1));
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="https://storage.googleapis.com/msgsndr/nQTW9979qfP1LADOwzLC/media/66abeef18f484e5507641ff9.png"
                alt="Ena Pragma"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.path);
                }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.path);
                  }}
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
