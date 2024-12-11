import { motion } from 'framer-motion';
import { ClipboardCheck, Clock, Calendar, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-center mb-6">
          <ClipboardCheck className="w-16 h-16 text-blue-500" />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Request Received!
          </h1>
          <p className="text-gray-600 text-lg">
            We're reviewing your project details to ensure we have everything needed to create your perfect website.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
            <Clock className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Next Steps</h3>
              <p className="text-gray-600">
                Our team will carefully review your requirements and prepare a detailed project plan within the next 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
            <Calendar className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Project Timeline</h3>
              <p className="text-gray-600">
                Once confirmed, our onboarding process takes 1 week, followed by a 2-4 week development period with regular progress updates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
            <Mail className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Communication</h3>
              <p className="text-gray-600">
                Watch your inbox for important updates. We'll reach out to discuss any additional details or clarifications needed to start your project.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}