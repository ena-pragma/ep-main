import CompanyInfo from "./CompanyInfo";
import QuickLinks from "./QuickLinks";
import ServicesList from "./ServicesList";
import ContactInfo from "./ContactInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <CompanyInfo />
          <QuickLinks />
          <ServicesList />
          <ContactInfo />
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-12 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Ena Pragma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}