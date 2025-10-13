'use client';

import { useState } from 'react';
import { type Therapist } from '@/lib/types';
import { TherapistCard } from './therapist-card';
import { Button } from './ui/button';
import { Frown } from 'lucide-react';

interface TherapistListProps {
  therapists: Therapist[];
  onViewDetails: (therapist: Therapist) => void;
}

const ITEMS_PER_PAGE = 9;

export function TherapistList({ therapists, onViewDetails }: TherapistListProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  if (therapists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center bg-card rounded-lg p-8">
        <Frown className="w-16 h-16 text-muted-foreground" />
        <h3 className="mt-4 text-xl font-semibold">No Therapists Found</h3>
        <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {therapists.slice(0, visibleCount).map((therapist) => (
          <TherapistCard key={therapist.id} therapist={therapist} onViewDetails={onViewDetails} />
        ))}
      </div>
      {visibleCount < therapists.length && (
        <div className="mt-8 text-center">
          <Button onClick={handleLoadMore} size="lg">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
