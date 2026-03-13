export default function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        <div className="flex justify-center mt-6">
          <div className="me-2 mt-1 flex-col gap-3 hidden md:flex">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-15 h-15 bg-gray-200 rounded border border-gray-100"></div>
            ))}
          </div>
          <div className="w-full max-w-md lg:max-w-lg aspect-square bg-gray-200 rounded-lg"></div>
        </div>

        <div className="space-y-6">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
          
          <div className="flex gap-4">
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>

          <div className="space-y-3">
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 w-20 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
            <div className="flex gap-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="h-14 w-full sm:w-32 bg-gray-200 rounded-full"></div>
            <div className="h-14 w-full sm:w-64 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-14 w-full bg-gray-200 rounded-full"></div>
          
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto sm:mx-0"></div>
        </div>
      </div>
    </div>
  );
}
