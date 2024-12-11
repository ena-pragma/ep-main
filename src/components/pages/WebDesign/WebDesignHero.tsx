import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import OnboardingForm from './components/OnboardingForm';
import FeatureList from './components/FeatureList';

export default function WebDesignHero() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white pt-8">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.4)',
        }}
      />
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              Professional Web Design in
              <span className="text-blue-500 block mt-2">Mobile, Alabama</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8">
              Get a stunning 5-page website for just $599
            </p>

            <FeatureList />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Begin Your Journey Today</h2>
              <OnboardingForm />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 flex items-start gap-6">
            <Shield className="w-12 h-12 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-500">
                100% Money-Back Guarantee
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Your satisfaction is our top priority. If you're not completely satisfied with your website design, 
                we'll refund your $599—no questions asked. We stand behind our work and are committed to delivering 
                a design that meets your expectations and helps your business thrive. It's our promise to you!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}