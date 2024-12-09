import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, X, ArrowLeft } from 'lucide-react';
import { useForm } from '../../hooks/useForm';
import { useToast } from '../../hooks/useToast';
import { answerSchema, type AnswerFormData } from '../../lib/validation/formValidation';
import type { UNQuestion, Evidence } from '../../types';
import FormField from '../common/FormField';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import { submitAnswer } from '../../lib/services/unReviewService';

interface QuestionnaireResponseFormProps {
  question: UNQuestion;
  onSubmit: (response: { text: string; documents: Evidence[] }) => void;
  onCancel: () => void;
}

export default function QuestionnaireResponseForm({
  question,
  onSubmit,
  onCancel
}: QuestionnaireResponseFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { toasts, addToast } = useToast();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useForm({
    initialValues: {
      text: '',
      documents: []
    } as AnswerFormData,
    validationSchema: answerSchema,
    onSubmit: async (data) => {
      try {
        // In a real app, upload files to storage and get URLs
        const documents = files.map(file => ({
          id: crypto.randomUUID(),
          type: file.type.startsWith('image/') ? 'image' : 
                file.type.startsWith('video/') ? 'video' : 'document',
          url: `https://example.com/files/${file.name}`,
          name: file.name
        }));

        await submitAnswer(question.id, data.text, documents);
        addToast('success', 'Response submitted successfully');
        onSubmit({ text: data.text, documents });
      } catch (error) {
        addToast('error', 'Failed to submit response');
        console.error('Error submitting response:', error);
      }
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const isOverdue = new Date(question.dueDate) < new Date();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onCancel}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">UN Review Question Response</h2>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900">Question:</h3>
        <p className="mt-2 text-gray-700">{question.question}</p>
        <div className="mt-2 flex items-center">
          <span className={`text-sm ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
            Due: {new Date(question.dueDate).toLocaleDateString()}
          </span>
          {isOverdue && (
            <span className="ml-2 flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              Overdue
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Your Response"
          error={errors.text}
          touched={touched.text}
          required
        >
          <textarea
            value={values.text}
            onChange={e => handleChange('text', e.target.value)}
            onBlur={() => handleBlur('text')}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Provide your detailed response here..."
          />
        </FormField>

        <div>
          <FormField
            label="Supporting Documents"
            helpText="Upload images, videos, or documents up to 10MB each"
          >
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>Upload files</span>
                    <input
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileChange}
                      accept="image/*,video/*,.pdf,.doc,.docx"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF up to 10MB each
                </p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                  >
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </FormField>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit Response
          </Button>
        </div>
      </form>
    </div>
  );
}