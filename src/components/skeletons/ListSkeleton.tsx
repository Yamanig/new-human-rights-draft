import React from 'react';

interface ListSkeletonProps {
  items?: number;
}

export default function ListSkeleton({ items = 5 }: ListSkeletonProps) {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-3 flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}