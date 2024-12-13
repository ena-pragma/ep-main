import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  inView: boolean;
  isLast: boolean;
}

export default function ProcessStep({
  icon: Icon,
  title,
  description,
  index,
  inView,
  isLast,
}: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative"
    >
      <div className="text-center">
        <div className="inline-block p-4 bg-gray-50 rounded-full shadow-md mb-6">
          <Icon className="w-8 h-8 text-gray-900" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      
      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gray-200">
          <div className="absolute right-0 -mt-1 w-3 h-3 rounded-full bg-gray-900" />
        </div>
      )}
    </motion.div>
  );
}