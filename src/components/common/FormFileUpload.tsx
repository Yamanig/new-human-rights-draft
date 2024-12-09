import React from 'react';
import { Upload, X } from 'lucide-react';
import { FieldError } from 'react-hook-form';

interface FormFileUploadProps {
  label: string;
  error?: FieldError;
  onFileSelect: (files: FileList) => void;
  onFileRemove: (index: number) => void;
  files: File[];
  accept?: string;
  multiple?: boolean;
}

export default function FormFileUpload({
  label,
  error,
  onFileSelect,
  onFileRemove,
  files,
  accept,
  multiple
}: FormFileUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
              <span>Upload files</span>
              <input
                type="file"
                className="sr-only"
                onChange={handleChange}
                accept={accept}
                multiple={multiple}
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
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
            >
              <span className="text-sm text-gray-600">{file.name}</span>
              <button
                type="button"
                onClick={() => onFileRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
}