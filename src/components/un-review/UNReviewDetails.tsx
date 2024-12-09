import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft,
  FileText,
  User,
  Calendar
} from 'lucide-react';
import Button from '../common/Button';
import { mockUNQuestions } from '../../data/mockData';
import QuestionnaireResponseForm from '../forms/QuestionnaireResponseForm';

const statusIcons = {
  pending: Clock,
  answered: CheckCircle,
  under_review: AlertTriangle
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  answered: 'bg-green-100 text-green-800',
  under_review: 'bg-blue-100 text-blue-800'
};

export default function UNReviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showResponseForm, setShowResponseForm] = useState(false);

  const question = mockUNQuestions.find(q => q.id === id);

  if (!question) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Question not found</h2>
        <Button 
          className="mt-4"
          onClick={() => navigate('/un-review')}
        >
          Back to UN Review
        </Button>
      </div>
    );
  }

  const StatusIcon = statusIcons[question.status];
  const statusColor = statusColors[question.status];
  const isOverdue = new Date(question.dueDate) < new Date();

  if (showResponseForm) {
    return (
      <QuestionnaireResponseForm
        question={question}
        onSubmit={(response) => {
          console.log('Submitting response:', response);
          setShowResponseForm(false);
        }}
        onCancel={() => setShowResponseForm(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/un-review')}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">UN Review Question</h2>
          </div>
          {question.status === 'pending' && (
            <Button
              onClick={() => setShowResponseForm(true)}
            >
              Provide Response
            </Button>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                <StatusIcon className="h-4 w-4 mr-1" />
                {question.status.replace('_', ' ').charAt(0).toUpperCase() + 
                 question.status.slice(1).replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Question</h3>
                <p className="text-gray-600">{question.question}</p>
              </div>

              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-2" />
                Assigned to: Stakeholder ID {question.assignedTo}
              </div>

              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                Due: {new Date(question.dueDate).toLocaleDateString()}
                {isOverdue && question.status === 'pending' && (
                  <span className="ml-2 text-red-600 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Overdue
                  </span>
                )}
              </div>
            </div>

            {question.answer && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Response</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 whitespace-pre-wrap">{question.answer.text}</p>
                  
                  {question.answer.documents.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Supporting Documents</h4>
                      <div className="space-y-2">
                        {question.answer.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center p-2 bg-white rounded-md"
                          >
                            <FileText className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">{doc.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="mt-4 text-sm text-gray-500">
                    Submitted on {new Date(question.answer.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-6">
                  <div className="relative">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <p className="text-sm text-gray-600">
                      Question created
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(question.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {question.answer && (
                <div className="flex items-start">
                  <div className="flex items-center h-6">
                    <div className="relative">
                      <span className="flex h-2 w-2 bg-green-500 rounded-full"></span>
                    </div>
                    <div className="ml-4 min-w-0 flex-1">
                      <p className="text-sm text-gray-600">
                        Response submitted
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(question.answer.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}