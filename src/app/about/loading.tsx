import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="space-y-12">
        {/* Hero Skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>

        {/* Mission Skeleton */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Skeleton className="h-80 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>

        {/* Values Skeleton */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-1/3 mx-auto" />
            <Skeleton className="h-5 w-1/2 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-32" />
                 <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        </div>

        {/* Team Skeleton */}
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <Skeleton className="h-10 w-1/3 mx-auto" />
                <Skeleton className="h-5 w-1/2 mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 p-6 border rounded-lg">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-5 w-40" />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
