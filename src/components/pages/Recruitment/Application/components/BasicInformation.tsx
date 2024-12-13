import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface BasicInformationProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function BasicInformation({ formData, onChange }: BasicInformationProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <div className="phone-input-container">
          <PhoneInput
            country={'us'}
            value={formData.phone}
            onChange={(phone) => onChange('phone', phone)}
            inputClass="!w-full !h-[42px] !text-base"
            containerClass="!w-full"
            buttonClass="!h-[42px] !border-gray-300"
            dropdownClass="!w-[300px] md:!w-[450px]"
            enableSearch
            disableSearchIcon
            searchPlaceholder="Search countries"
          />
        </div>
      </div>

      <style>{`
        .phone-input-container .react-tel-input .form-control {
          width: 100% !important;
          height: 42px !important;
          padding-left: 50px !important;
          border-color: #D1D5DB !important;
          border-radius: 0.5rem !important;
        }

        .phone-input-container .react-tel-input .flag-dropdown {
          border-color: #D1D5DB !important;
          border-radius: 0.5rem 0 0 0.5rem !important;
          background-color: #fff !important;
        }

        .phone-input-container .react-tel-input .selected-flag {
          border-radius: 0.5rem 0 0 0.5rem !important;
          background-color: transparent !important;
        }

        .phone-input-container .react-tel-input .country-list {
          margin: 4px 0 !important;
          border-radius: 0.5rem !important;
          border: 1px solid #D1D5DB !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }

        @media (max-width: 640px) {
          .phone-input-container .react-tel-input .country-list {
            width: 280px !important;
          }
        }
      `}</style>
    </div>
  );
}