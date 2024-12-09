import React from 'react';
import { CheckCircle, AlertTriangle, X, Info } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
};

const colors = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        const colorClass = colors[toast.type];

        return (
          <div
            key={toast.id}
            className={`${colorClass} flex items-center p-4 rounded-lg border shadow-lg max-w-md animate-slide-in`}
          >
            <Icon className="h-5 w-5 mr-3" />
            <p className="flex-1">{toast.message}</p>
            <button
              onClick={() => onRemove(toast.id)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}