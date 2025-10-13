import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12 space-y-4">
        <Skeleton className="h-12 w-2/4 mx-auto" />
        <Skeleton className="h-6 w-3/4 max-w-2xl mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="flex flex-col overflow-hidden">
            <Skeleton className="h-56 w-full" />
            <CardHeader>
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-7 w-full mt-2" />
                <Skeleton className="h-5 w-3/4 mt-1" />
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-6 w-28" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
