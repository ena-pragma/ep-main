interface ProfessionalLinksProps {
  formData: {
    linkedin: string;
    portfolio: string;
    resume: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function ProfessionalLinks({ formData, onChange }: ProfessionalLinksProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Professional Links</h2>
      
      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedin"
          value={formData.linkedin}
          onChange={(e) => onChange('linkedin', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <div>
        <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
          Portfolio/Website
        </label>
        <input
          type="url"
          id="portfolio"
          value={formData.portfolio}
          onChange={(e) => onChange('portfolio', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
          placeholder="https://yourportfolio.com"
        />
      </div>

      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
          Resume Link
        </label>
        <input
          type="url"
          id="resume"
          value={formData.resume}
          onChange={(e) => onChange('resume', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
          placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
        />
      </div>
    </div>
  );
}