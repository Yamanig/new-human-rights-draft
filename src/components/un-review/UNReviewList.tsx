import React, { useState } from 'react';
import { Clock, CheckCircle, Search, AlertTriangle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { UNQuestion } from '../../types';
import { mockUNQuestions } from '../../data/mockData';
import QuestionnaireResponseForm from '../forms/QuestionnaireResponseForm';

const statusIcons = {
  pending: Clock,
  answered: CheckCircle,
  under_review: Search
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  answered: 'bg-green-100 text-green-800',
  under_review: 'bg-blue-100 text-blue-800'
};

interface UNReviewListProps {
  onNewQuestion?: () => void;
}

export default function UNReviewList({ onNewQuestion }: UNReviewListProps) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [questions, setQuestions] = useState<UNQuestion[]>(mockUNQuestions);
  const [respondingTo, setRespondingTo] = useState<UNQuestion | null>(null);

  const filteredQuestions = filter === 'all'
    ? questions
    : questions.filter(q => q.status === filter);

  const isOverdue = (question: UNQuestion) => {
    return question.status === 'pending' && new Date(question.dueDate) < new Date();
  };

  const handleSubmitResponse = (questionId: string, response: { text: string; documents: any[] }) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? {
        ...q,
        status: 'answered',
        answer: {
          text: response.text,
          documents: response.documents,
          submittedAt: new Date().toISOString()
        }
      } : q
    ));
    setRespondingTo(null);
  };

  if (respondingTo) {
    return (
      <QuestionnaireResponseForm
        question={respondingTo}
        onSubmit={(response) => handleSubmitResponse(respondingTo.id, response)}
        onCancel={() => setRespondingTo(null)}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">UN Review Questions</h2>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Questions</option>
            <option value="pending">Pending</option>
            <option value="answered">Answered</option>
            <option value="under_review">Under Review</option>
          </select>
          <button 
            onClick={() => navigate('/un-review/new')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Question
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No questions found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new question.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/un-review/new')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Question
              </button>
            </div>
          </div>
        ) : (
          filteredQuestions.map((question) => {
            const StatusIcon = statusIcons[question.status];
            const statusColor = statusColors[question.status];

            return (
              <div
                key={question.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/un-review/${question.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {question.question}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Report #{question.reportId} • Due {new Date(question.dueDate).toLocaleDateString()}
                    </p>
                    {isOverdue(question) && (
                      <p className="text-red-600 text-sm flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Overdue
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    {question.status === 'pending' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRespondingTo(question);
                        }}
                        className="px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-md"
                      >
                        Respond
                      </button>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${statusColor}`}>
                      <StatusIcon className="h-4 w-4 mr-1" />
                      {question.status.replace('_', ' ').charAt(0).toUpperCase() + 
                       question.status.slice(1).replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                {question.answer && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">{question.answer.text}</p>
                    {question.answer.documents.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {question.answer.documents.map((doc) => (
                          <span
                            key={doc.id}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white border border-gray-200"
                          >
                            {doc.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      Submitted on {new Date(question.answer.submittedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}