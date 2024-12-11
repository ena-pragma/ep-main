import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addContactForm } from '../../../../../lib/ghl';
import toast from 'react-hot-toast';
import { Question } from '../types';

interface FormData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  resume: string;
  coverLetter: string;
  questions: Question[];
}

export function useApplicationForm(position: string, positionTitle: string) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    resume: '',
    coverLetter: '',
    questions: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `
Position: ${positionTitle}
${formData.linkedin ? `LinkedIn: ${formData.linkedin}` : ''}
${formData.portfolio ? `Portfolio: ${formData.portfolio}` : ''}
${formData.resume ? `Resume: ${formData.resume}` : ''}

Position-Specific Questions:
${formData.questions.map(q => `
Q: ${q.question}
A: ${q.answer}
`).join('\n')}

Cover Letter:
${formData.coverLetter}
      `.trim();

      await addContactForm({
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' '),
        email: formData.email,
        phone: formData.phone,
        message,
        source: `Career Application - ${positionTitle}`,
        tags: ['Career Application', positionTitle],
        type: 'candidate'
      });

      toast.success('Application submitted successfully!');
      navigate('/candidate-thank-you');
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (index: number, answer: string) => {
    const newQuestions = [...formData.questions];
    newQuestions[index].answer = answer;
    setFormData(prev => ({ ...prev, questions: newQuestions }));
  };

  return {
    formData,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleQuestionChange,
    setFormData
  };
}