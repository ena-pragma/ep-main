import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function QuickLinks() {
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
  );
}