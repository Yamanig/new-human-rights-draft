import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Question } from '../../types';

export default function QuestionnaireForm() {
  const [questions, setQuestions] = React.useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, {
      id: crypto.randomUUID(),
      text: '',
      type: 'text',
      required: false
    }]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Questionnaire</h2>
        <button
          onClick={addQuestion}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </button>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="p-4 border rounded-lg">
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="Enter question"
                className="flex-1 mr-4 px-3 py-2 border rounded-md"
                value={question.text}
                onChange={(e) => {
                  setQuestions(questions.map(q =>
                    q.id === question.id ? { ...q, text: e.target.value } : q
                  ));
                }}
              />
              <button
                onClick={() => removeQuestion(question.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="px-3 py-2 border rounded-md"
                value={question.type}
                onChange={(e) => {
                  setQuestions(questions.map(q =>
                    q.id === question.id ? { ...q, type: e.target.value as Question['type'] } : q
                  ));
                }}
              >
                <option value="text">Text</option>
                <option value="choice">Multiple Choice</option>
                <option value="date">Date</option>
              </select>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => {
                    setQuestions(questions.map(q =>
                      q.id === question.id ? { ...q, required: e.target.checked } : q
                    ));
                  }}
                  className="mr-2"
                />
                Required
              </label>
            </div>
          </div>
        ))}
      </div>

      {questions.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save Questionnaire
          </button>
        </div>
      )}
    </div>
  );
}