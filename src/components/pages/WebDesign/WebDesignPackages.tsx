import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const packages = [
  {
    name: 'Starter Package',
    price: '599',
    features: [
      '5-Page Professional Website',
      'Mobile Responsive Design',
      'Contact Form',
      'Basic SEO Setup',
      'Social Media Integration',
      'Google Maps Integration',
      '2 Rounds of Revisions',
      '1 Month of Support'
    ]
  },
  {
    name: 'Business Package',
    price: '999',
    features: [
      '10-Page Professional Website',
      'Mobile Responsive Design',
      'Advanced Contact Forms',
      'Comprehensive SEO Setup',
      'Social Media Integration',
      'Google Maps & Analytics',
      'Blog Setup',
      'Newsletter Integration',
      '3 Rounds of Revisions',
      '3 Months of Support'
    ]
  },
  {
    name: 'Custom Package',
    price: 'Custom',
    features: [
      'Unlimited Pages',
      'Custom Functionality',
      'E-commerce Integration',
      'Advanced SEO Strategy',
      'Custom Integrations',
      'Priority Support',
      'Unlimited Revisions',
      '6 Months of Support'
    ]
  }
];

export default function WebDesignPackages() {
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
            Affordable Web Design Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect package for your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {pkg.price === 'Custom' ? pkg.price : `$${pkg.price}`}
                  </span>
                  {pkg.price !== 'Custom' && (
                    <span className="text-gray-500 ml-2">/one-time</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/#contact"
                  className="block w-full text-center bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}