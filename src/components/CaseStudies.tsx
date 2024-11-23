import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const caseStudies = [
  {
    title: 'VertBuild.AI',
    client: 'Construction Technology',
    description: 'Revolutionizing construction planning with AI-powered solutions',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80',
  },
  {
    title: 'LL97.ai',
    client: 'Environmental Compliance',
    description: 'Streamlining NYC building emissions compliance through AI automation',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80',
  },
  {
    title: 'Vert Energy Group',
    client: 'Energy Management',
    description: 'Optimizing energy efficiency and sustainability solutions nationwide',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80',
  },
];

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="case-studies" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforming industries through innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={study.image}
                  alt={study.title}
                  className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                <p className="text-gray-300 mb-2">{study.client}</p>
                <p className="text-white/90">{study.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}