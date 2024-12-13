import { motion } from 'framer-motion';
import { ClipboardCheck, Clock, Users, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CandidateThankYou() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full"
      >
        <div className="flex justify-center mb-6">
          <ClipboardCheck className="w-16 h-16 text-gray-900" />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Received!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for your interest in joining our team. We're excited to review your application.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Clock className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Application Review</h3>
              <p className="text-gray-600">
                Our team will carefully review your application within the next 48-72 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Users className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Next Steps</h3>
              <p className="text-gray-600">
                If your qualifications match our needs, we'll reach out to schedule an initial interview.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <Mail className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">Stay Connected</h3>
              <p className="text-gray-600">
                Keep an eye on your email for updates regarding your application status.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-black text-white py-3 px-8 rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}