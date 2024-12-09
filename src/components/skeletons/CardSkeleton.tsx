import React from 'react';

interface CardSkeletonProps {
  count?: number;
}

export default function CardSkeleton({ count = 1 }: CardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="rounded-lg bg-gray-200 h-12 w-12"></div>
            <div className="ml-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}