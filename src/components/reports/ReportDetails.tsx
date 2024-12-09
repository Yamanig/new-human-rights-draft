import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  FileText, 
  User, 
  AlertTriangle,
  ArrowLeft,
  MessageSquarePlus
} from 'lucide-react';
import Button from '../common/Button';
import { mockReports } from '../../data/mockData';
import EscalationForm from '../escalation/EscalationForm';
import UNQuestionForm from '../un-review/UNQuestionForm';

export default function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEscalation, setShowEscalation] = useState(false);
  const [showUNQuestion, setShowUNQuestion] = useState(false);

  const report = mockReports.find(r => r.id === id);

  if (!report) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Report not found</h2>
        <Button 
          className="mt-4"
          onClick={() => navigate('/reports')}
        >
          Back to Reports
        </Button>
      </div>
    );
  }

  const handleEscalate = async (data: any) => {
    console.log('Escalating report:', data);
    setShowEscalation(false);
  };

  const handleAddUNQuestion = async (data: any) => {
    console.log('Adding UN question:', data);
    setShowUNQuestion(false);
  };

  if (showEscalation) {
    return (
      <EscalationForm
        reportId={report.id}
        currentLevel={1}
        onSubmit={handleEscalate}
        onCancel={() => setShowEscalation(false)}
      />
    );
  }

  if (showUNQuestion) {
    return (
      <UNQuestionForm
        reportId={report.id}
        onSubmit={handleAddUNQuestion}
        onCancel={() => setShowUNQuestion(false)}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/reports')}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Report Details</h2>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="secondary"
              onClick={() => setShowUNQuestion(true)}
              icon={<MessageSquarePlus className="h-4 w-4" />}
            >
              Add UN Question
            </Button>
            <Button
              variant="danger"
              onClick={() => setShowEscalation(true)}
              icon={<AlertTriangle className="h-4 w-4" />}
            >
              Escalate
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{report.title}</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                {report.location}
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(report.incidentDate).toLocaleDateString()}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                Status: <span className="ml-1 capitalize">{report.status}</span>
              </div>
              {report.assignedTo && (
                <div className="flex items-center text-gray-600">
                  <User className="h-5 w-5 mr-2" />
                  Assigned to: <span className="ml-1">Stakeholder ID: {report.assignedTo}</span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 whitespace-pre-wrap">{report.description}</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Evidence</h4>
            {report.evidence.length > 0 ? (
              <div className="space-y-4">
                {report.evidence.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <FileText className="h-6 w-6 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No evidence attached to this report</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}