import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addContactForm, addNote, findContactByEmail } from '../../../../lib/ghl';
import CompletionModal from './CompletionModal';

interface QuestionnaireFormProps {
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    businessName: string;
  };
}

export default function QuestionnaireForm({ contactInfo }: QuestionnaireFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    businessDescription: '',
    targetAudience: '',
    competitors: '',
    websiteGoals: '',
    preferredColors: '',
    additionalFeatures: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const noteContent = `
Website Questionnaire Responses:
-----------------------------
Business Description:
${formData.businessDescription}

Target Audience:
${formData.targetAudience}

Competitors:
${formData.competitors}

Website Goals:
${formData.websiteGoals}

Preferred Colors:
${formData.preferredColors}

Additional Features:
${formData.additionalFeatures}
      `.trim();

      // First try to find existing contact
      let contactId;
      try {
        const existingContact = await findContactByEmail(contactInfo.email);
        if (existingContact?.contact?.id) {
          contactId = existingContact.contact.id;
        }
      } catch (error) {
        console.log('Contact not found, will create new one');
      }

      // If no existing contact, create new one
      if (!contactId) {
        const contactResponse = await addContactForm({
          firstName: contactInfo.name.split(' ')[0],
          lastName: contactInfo.name.split(' ').slice(1).join(' '),
          email: contactInfo.email,
          phone: contactInfo.phone,
          message: `Business Name: ${contactInfo.businessName}`,
          source: 'Web Design Questionnaire',
          tags: ['Web Design Questionnaire Completed', 'Mobile, AL'],
        });
        contactId = contactResponse?.contact?.id;
      }

      // Add note if we have a contact ID
      if (contactId) {
        await addNote({
          contactId,
          body: noteContent,
        });

        setShowModal(true);
      } else {
        throw new Error('Failed to create or find contact');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit questionnaire. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields remain the same */}
        <div>
          <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Tell us about your business
          </label>
          <textarea
            id="businessDescription"
            rows={3}
            value={formData.businessDescription}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="What products or services do you offer?"
          />
        </div>

        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
            Who is your target audience?
          </label>
          <textarea
            id="targetAudience"
            rows={3}
            value={formData.targetAudience}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your ideal customers"
          />
        </div>

        <div>
          <label htmlFor="competitors" className="block text-sm font-medium text-gray-700 mb-2">
            Who are your main competitors?
          </label>
          <textarea
            id="competitors"
            rows={3}
            value={formData.competitors}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="List your main competitors and their websites if known"
          />
        </div>

        <div>
          <label htmlFor="websiteGoals" className="block text-sm font-medium text-gray-700 mb-2">
            What are your website goals?
          </label>
          <textarea
            id="websiteGoals"
            rows={3}
            value={formData.websiteGoals}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="What do you want to achieve with your website?"
          />
        </div>

        <div>
          <label htmlFor="preferredColors" className="block text-sm font-medium text-gray-700 mb-2">
            Do you have any color preferences?
          </label>
          <textarea
            id="preferredColors"
            rows={2}
            value={formData.preferredColors}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Any specific colors you'd like us to use?"
          />
        </div>

        <div>
          <label htmlFor="additionalFeatures" className="block text-sm font-medium text-gray-700 mb-2">
            Additional features or requirements?
          </label>
          <textarea
            id="additionalFeatures"
            rows={3}
            value={formData.additionalFeatures}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Any specific features you'd like to include?"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
        </motion.button>
      </form>

      <CompletionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}