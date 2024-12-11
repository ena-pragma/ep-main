import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuestionnaireForm from './QuestionnaireForm';
import { Toaster } from 'react-hot-toast';

export default function QuestionnairePage() {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState<any>(null);

  useEffect(() => {
    const storedContact = sessionStorage.getItem('webDesignContact');
    if (!storedContact) {
      navigate('/web-design');
      return;
    }
    setContactInfo(JSON.parse(storedContact));
  }, [navigate]);

  if (!contactInfo) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Website Questionnaire</h1>
          <p className="text-gray-600 mb-8">
            Help us understand your vision better, {contactInfo.name.split(' ')[0]}. This information will help us create the perfect website for {contactInfo.businessName}.
          </p>
          <QuestionnaireForm contactInfo={contactInfo} />
        </motion.div>
      </div>
    </div>
  );
}