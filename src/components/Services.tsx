import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Code, Settings, BarChart } from 'lucide-react';

const services = [
  {
    icon: Rocket,
    title: 'Growth Strategy',
    description: 'Data-driven strategies to accelerate your business growth and market presence.',
  },
  {
    icon: Code,
    title: 'Technology Solutions',
    description: 'Custom software and digital solutions tailored to your specific needs.',
  },
  {
    icon: Settings,
    title: 'Operational Excellence',
    description: 'Streamline operations and optimize processes for maximum efficiency.',
  },
  {
    icon: BarChart,
    title: 'Sales & Marketing',
    description: 'Align your sales and marketing efforts for better conversion and ROI.',
  },
];

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions to drive your business forward
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
            >
              <service.icon className="w-12 h-12 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}