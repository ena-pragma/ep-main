import { useState } from 'react';
import toast from 'react-hot-toast';
import { addContactForm } from '../../../../lib/ghl';
import { formatPhoneNumber } from '../../../../utils/formatters';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
}

interface OnboardingFormProps {
  onSuccess?: () => void;
}

export default function OnboardingForm({ onSuccess }: OnboardingFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    if (formattedPhone.replace(/\D/g, '').length <= 10) {
      setFormData(prev => ({ ...prev, phone: formattedPhone }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      toast.error('Please enter a valid US phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      await addContactForm({
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' '),
        email: formData.email,
        phone: formData.phone,
        message: `Business Name: ${formData.businessName}\nInterested in: $599 Web Design Package`,
        source: 'Web Design Landing Page',
        tags: ['Web Design Landing Page', 'Mobile, AL'],
      });

      toast.success('Great! Let\'s gather some information about your project.');
      // Store form data in session storage for the questionnaire
      sessionStorage.setItem('webDesignContact', JSON.stringify(formData));
      navigate('/web-design/questionnaire');
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'phone') return;
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="John Smith"
        />
      </div>
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium mb-2">
          Business Name
        </label>
        <input
          type="text"
          id="businessName"
          value={formData.businessName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Your Business Name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          required
          className="w-full px-4 py-2 bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="(555) 555-5555"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        {isSubmitting ? 'Starting Your Journey...' : 'Start Your Web Design Journey'}
      </button>
    </form>
  );
}