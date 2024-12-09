import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FormErrorProps {
  message: string;
  className?: string;
}

export default function FormError({ message, className = '' }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className={`text-sm text-red-600 mt-1 flex items-center ${className}`}>
      <AlertTriangle className="h-4 w-4 mr-1" />
      <span>{message}</span>
    </div>
  );
}