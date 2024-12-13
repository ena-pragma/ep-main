import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface PositionCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  requirements: string[];
  index: number;
  inView: boolean;
}

export default function PositionCard({
  title,
  icon: Icon,
  description,
  requirements,
  index,
  inView,
}: PositionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      <Icon className="w-12 h-12 text-gray-900 mb-4" />
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
        <ul className="space-y-2">
          {requirements.map((req) => (
            <li key={req} className="text-gray-600 text-sm">
              • {req}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={`/apply/${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
      >
        Apply Now
      </Link>
    </motion.div>
  );
}