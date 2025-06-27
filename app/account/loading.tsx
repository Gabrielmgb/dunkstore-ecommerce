export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="h-12 bg-gray-800 rounded-lg w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-800 rounded w-48 mb-1 animate-pulse"></div>
            <div className="h-3 bg-gray-800 rounded w-40 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-800 rounded w-24 animate-pulse"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="text-center">
                <div className="h-8 w-8 bg-gray-800 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-800 rounded w-12 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-16 mx-auto animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="w-full">
          <div className="grid grid-cols-5 bg-gray-900 rounded-lg mb-8 p-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-800 rounded animate-pulse"></div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="p-6 border-b border-gray-800">
              <div className="h-6 bg-gray-800 rounded w-48 animate-pulse"></div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-24 animate-pulse"></div>
                    <div className="h-10 bg-gray-800 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
