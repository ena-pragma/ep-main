import { Instagram, Facebook, Linkedin, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
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

  const handleClick = (path: string) => {
    if (path === "/blog" || path === "/apply") {
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
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info & Social */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold tracking-tighter mb-3">
              ENA PRAGMA
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Strategic consulting for ambitious companies ready to define the
              future.
            </p>

            <div>
              <h4 className="text-sm font-semibold mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/enapragma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/enapragma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/enapragma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleClick("/#about")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick("/#services")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick("/#case-studies")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick("/blog")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick("/apply")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Growth Strategy</li>
              <li className="text-gray-400">Technology Solutions</li>
              <li className="text-gray-400">Operational Excellence</li>
              <li className="text-gray-400">Sales & Marketing</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@enapragma.co</span>
              </li>
              <li className="text-gray-400">
                10268 Oak Lane
                <br />
                Grand Bay, AL 36541
              </li>
              <li className="text-gray-400">(251) 725-9969</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-12 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Ena Pragma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}