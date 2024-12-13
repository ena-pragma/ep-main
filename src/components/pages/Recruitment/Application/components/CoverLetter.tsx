interface CoverLetterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CoverLetter({ value, onChange }: CoverLetterProps) {
  return (
    <div>
      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
        Cover Letter *
      </label>
      <textarea
        id="coverLetter"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
        placeholder="Tell us why you're interested in this position and what makes you a great fit..."
      />
    </div>
  );
}