import { Check } from 'lucide-react';

const features = [
  '5-Page Professional Website',
  'Mobile Responsive Design',
  'Contact Form',
  'Basic SEO Setup',
  'Social Media Integration',
  'Google Maps Integration',
  '2 Rounds of Revisions',
  '1 Month of Support'
];

export default function FeatureList() {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">Package Includes:</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}