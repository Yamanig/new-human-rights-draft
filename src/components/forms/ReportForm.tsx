import React from 'react';
import { Upload } from 'lucide-react';
import { useReportForm } from '../../hooks/useReportForm';
import FormField from '../common/FormField';
import Button from '../common/Button';
import { useToast } from '../../hooks/useToast';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ReportForm() {
  const {
    values,
    errors,
    touched,
    files,
    isSubmitting,
    isUploading,
    handleChange,
    handleBlur,
    handleSubmit,
    handleFileChange,
    removeFile,
    resetForm
  } = useReportForm();

  const { addToast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      addToast('success', 'Report submitted successfully');
    } catch (error) {
      addToast('error', 'Failed to submit report. Please try again.');
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Human Rights Violation Report</h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          label="Report Title"
          error={touched.title ? errors.title : undefined}
          required
        >
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={(e) => handleChange('title', e.target.value)}
            onBlur={() => handleBlur('title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter a descriptive title"
          />
        </FormField>

        <FormField
          label="Description"
          error={touched.description ? errors.description : undefined}
          required
        >
          <textarea
            name="description"
            value={values.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Provide detailed information about the incident"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Location"
            error={touched.location ? errors.location : undefined}
            required
          >
            <input
              type="text"
              name="location"
              value={values.location}
              onChange={(e) => handleChange('location', e.target.value)}
              onBlur={() => handleBlur('location')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter specific location"
            />
          </FormField>

          <FormField
            label="Date of Incident"
            error={touched.incidentDate ? errors.incidentDate : undefined}
            required
          >
            <input
              type="date"
              name="incidentDate"
              value={values.incidentDate}
              onChange={(e) => handleChange('incidentDate', e.target.value)}
              onBlur={() => handleBlur('incidentDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </FormField>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={values.isAnonymous}
              onChange={(e) => handleChange('isAnonymous', e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">Submit Anonymously</label>
          </div>

          {!values.isAnonymous && (
            <div className="space-y-4">
              <FormField
                label="Full Name"
                error={touched.reporterName ? errors.reporterName : undefined}
              >
                <input
                  type="text"
                  name="reporterName"
                  value={values.reporterName || ''}
                  onChange={(e) => handleChange('reporterName', e.target.value)}
                  onBlur={() => handleBlur('reporterName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </FormField>

              <FormField
                label="Contact Email"
                error={touched.reporterContact ? errors.reporterContact : undefined}
              >
                <input
                  type="email"
                  name="reporterContact"
                  value={values.reporterContact || ''}
                  onChange={(e) => handleChange('reporterContact', e.target.value)}
                  onBlur={() => handleBlur('reporterContact')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter your email address"
                />
              </FormField>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Upload</label>
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
                    onChange={(e) => e.target.files && handleFileChange(e.target.files)}
                    accept="image/*,video/*,.pdf,.doc,.docx"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                Images, videos, or documents up to 10MB each
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                >
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={resetForm}
            disabled={isSubmitting || isUploading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting || isUploading}
            disabled={isSubmitting || isUploading}
          >
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
}