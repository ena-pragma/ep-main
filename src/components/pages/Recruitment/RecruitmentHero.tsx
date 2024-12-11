import { motion } from 'framer-motion';

export default function RecruitmentHero() {
  return (
    <div className="min-h-[70vh] relative overflow-hidden bg-black text-white pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.4)',
        }}
      />
      
      <div className="relative container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            Join Our Digital Innovation Team
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Shape the future of digital marketing and technology with AI-driven solutions
          </p>

          <a
            href="#positions"
            className="inline-block bg-white text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            View Open Positions
          </a>
        </motion.div>
      </div>
    </div>
  );
}