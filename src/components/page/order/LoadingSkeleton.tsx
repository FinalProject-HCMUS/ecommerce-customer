import React from 'react'

interface LoadingSkeletonProps {
  count?: number
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-5 bg-gray-300 rounded w-20"></div>
              <div className="h-5 bg-gray-300 rounded w-16"></div>
              <div className="h-8 bg-gray-300 rounded w-24"></div>
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
