import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="lg:col-span-1">
      <h3 className="text-sm font-semibold mb-4">Contact</h3>
      <ul className="space-y-3 text-sm">
        <li>
          <a
            href="mailto:info@enapragma.co"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
          >
            <Mail className="w-4 h-4 group-hover:text-white transition-colors" />
            <span>info@enapragma.co</span>
          </a>
        </li>
        <li className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-gray-400" />
          <span className="text-gray-400">
            10268 Oak Lane
            <br />
            Grand Bay, AL 36541
          </span>
        </li>
        <li>
          <a
            href="tel:+12517259969"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
          >
            <Phone className="w-4 h-4 group-hover:text-white transition-colors" />
            <span>(251) 725-9969</span>
          </a>
        </li>
      </ul>
    </div>
  );
}