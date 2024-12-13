import SocialLinks from "./SocialLinks";

export default function CompanyInfo() {
  return (
    <div className="lg:col-span-1">
      <h3 className="text-xl font-bold tracking-tighter mb-3">
        ENA PRAGMA
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Strategic consulting for ambitious companies ready to define the future.
      </p>
      <SocialLinks />
    </div>
  );
}