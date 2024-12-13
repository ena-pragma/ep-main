import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function SocialLinks() {
  return (
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
  );
}