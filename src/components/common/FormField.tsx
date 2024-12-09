import React from 'react';
import FormError from './FormError';

interface FormFieldProps {
  label: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  children: React.ReactNode;
  helpText?: string;
}

export default function FormField({
  label,
  error,
  touched,
  required,
  children,
  helpText
}: FormFieldProps) {
  const showError = touched && error;
  
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {helpText && !showError && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
      {showError && <FormError message={error} />}
    </div>
  );
}