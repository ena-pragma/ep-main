import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Users, Lightbulb } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            We Increase Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driving Business Success Through Strategic Expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <TrendingUp className="w-12 h-12 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Growth Expertise</h3>
            <p className="text-gray-600">
              Led by growth expert Carl Sapp, we transform ambitious visions into scalable strategies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Users className="w-12 h-12 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Collaborative Approach</h3>
            <p className="text-gray-600">
              We work alongside you to unlock your company's true revenue potential.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Lightbulb className="w-12 h-12 text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Innovative Solutions</h3>
            <p className="text-gray-600">
              Streamlining operations and enhancing revenue to keep you ahead of the curve.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}