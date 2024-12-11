interface Question {
  question: string;
  answer: string;
}

interface PositionQuestionsProps {
  questions: Question[];
  onChange: (index: number, answer: string) => void;
}

export default function PositionQuestions({ questions, onChange }: PositionQuestionsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Position-Specific Questions</h2>
      
      {questions.map((q, index) => (
        <div key={q.question}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {q.question} *
          </label>
          <textarea
            required
            value={q.answer}
            onChange={(e) => onChange(index, e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
          />
        </div>
      ))}
    </div>
  );
}