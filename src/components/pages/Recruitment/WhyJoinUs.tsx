import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { benefits } from './data/benefits';
import BenefitCard from './components/BenefitCard';

export default function WhyJoinUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Why Join Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Be part of a team that's revolutionizing digital marketing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              {...benefit}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}