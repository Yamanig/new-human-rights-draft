import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export default function FormCheckbox({
  label,
  error,
  ...props
}: FormCheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className={`
          h-4 w-4 rounded
          ${error
            ? 'border-red-300 text-red-600 focus:ring-red-500'
            : 'border-gray-300 text-indigo-600 focus:ring-indigo-500'
          }
        `}
        {...props}
      />
      <label className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
}