import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { positions } from '../data/positions';
import { positionQuestions } from '../data/questions';
import { useApplicationForm } from './hooks/useApplicationForm';
import BasicInformation from './components/BasicInformation';
import ProfessionalLinks from './components/ProfessionalLinks';
import PositionQuestions from './components/PositionQuestions';
import CoverLetter from './components/CoverLetter';

export default function ApplicationForm() {
  const { position } = useParams();
  const navigate = useNavigate();

  const positionDetails = positions.find(
    p => p.title.toLowerCase().replace(/\s+/g, '-') === position
  );

  const {
    formData,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleQuestionChange,
    setFormData
  } = useApplicationForm(position || '', positionDetails?.title || '');

  useEffect(() => {
    if (!positionDetails || !position) {
      navigate('/apply');
      return;
    }

    const questions = positionQuestions[position]?.map(q => ({ question: q, answer: '' })) || [];
    setFormData(prev => ({ ...prev, questions }));
  }, [position, positionDetails, navigate, setFormData]);

  if (!positionDetails || !position) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Apply for {positionDetails.title}
          </h1>
          <p className="text-gray-600 mb-8">
            Please fill out the form below to apply for this position.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <BasicInformation
              formData={formData}
              onChange={handleChange}
            />

            <ProfessionalLinks
              formData={formData}
              onChange={handleChange}
            />

            <PositionQuestions
              questions={formData.questions}
              onChange={handleQuestionChange}
            />

            <CoverLetter
              value={formData.coverLetter}
              onChange={(value) => handleChange('coverLetter', value)}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}