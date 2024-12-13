import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { applicationSteps } from './data/applicationSteps';
import ProcessStep from './components/ProcessStep';

export default function ApplicationProcess() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Application Process
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our straightforward process to joining the team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {applicationSteps.map((step, index) => (
            <ProcessStep
              key={step.title}
              {...step}
              index={index}
              inView={inView}
              isLast={index === applicationSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}