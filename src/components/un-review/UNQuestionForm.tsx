import React from 'react';
import { Upload, X, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useForm } from '../../hooks/useForm';
import { useToast } from '../../hooks/useToast';
import { useStakeholders } from '../../hooks/useStakeholders';
import { unQuestionSchema, type UNQuestionFormData } from '../../lib/validation/formValidation';
import { createQuestion } from '../../lib/services/unReviewService';
import FormField from '../common/FormField';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

interface UNQuestionFormProps {
  reportId?: string;
  onSubmit: (data: UNQuestionFormData) => void;
  onCancel: () => void;
}

const initialValues: UNQuestionFormData = {
  question: '',
  reportId: '',
  assignedTo: '',
  dueDate: ''
};

export default function UNQuestionForm({ reportId, onSubmit, onCancel }: UNQuestionFormProps) {
  const { stakeholders, loading: loadingStakeholders, error: stakeholdersError } = useStakeholders();
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
    initialValues: { ...initialValues, reportId: reportId || '' },
    validationSchema: unQuestionSchema,
    onSubmit: async (data) => {
      try {
        const question = await createQuestion({
          ...data,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        
        addToast('success', 'Question created successfully');
        onSubmit(data);
      } catch (error) {
        addToast('error', 'Failed to create question');
        console.error('Error creating question:', error);
      }
    }
  });

  if (loadingStakeholders) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (stakeholdersError) {
    return (
      <div className="p-6">
        <ErrorMessage
          message={stakeholdersError}
          className="mb-4"
        />
        <Button onClick={onCancel}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onCancel}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">
          Create UN Review Question
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!reportId && (
          <FormField
            label="Report Reference"
            error={errors.reportId}
            touched={touched.reportId}
            required
          >
            <input
              type="text"
              value={values.reportId}
              onChange={e => handleChange('reportId', e.target.value)}
              onBlur={() => handleBlur('reportId')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter report ID"
            />
          </FormField>
        )}

        <FormField
          label="Question"
          error={errors.question}
          touched={touched.question}
          required
        >
          <textarea
            value={values.question}
            onChange={e => handleChange('question', e.target.value)}
            onBlur={() => handleBlur('question')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter the question for review"
          />
        </FormField>

        <FormField
          label="Assigned Stakeholder"
          error={errors.assignedTo}
          touched={touched.assignedTo}
          required
        >
          <select
            value={values.assignedTo}
            onChange={e => handleChange('assignedTo', e.target.value)}
            onBlur={() => handleBlur('assignedTo')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Stakeholder</option>
            {stakeholders.map((stakeholder) => (
              <option key={stakeholder.id} value={stakeholder.id}>
                {stakeholder.name} - {stakeholder.department} (Level {stakeholder.role.replace('level', '')})
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Due Date"
          error={errors.dueDate}
          touched={touched.dueDate}
          required
        >
          <input
            type="datetime-local"
            value={values.dueDate}
            onChange={e => handleChange('dueDate', e.target.value)}
            onBlur={() => handleBlur('dueDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </FormField>

        <div className="flex justify-end space-x-4 pt-4">
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
            Create Question
          </Button>
        </div>
      </form>
    </div>
  );
}