import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12 space-y-4">
        <Skeleton className="h-12 w-1/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Form Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>

        {/* Info Skeleton */}
        <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex-row items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
