import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  inView: boolean;
}

export default function BenefitCard({
  icon: Icon,
  title,
  description,
  index,
  inView,
}: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="text-center"
    >
      <div className="inline-block p-4 bg-white rounded-full shadow-md mb-6">
        <Icon className="w-8 h-8 text-gray-900" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}