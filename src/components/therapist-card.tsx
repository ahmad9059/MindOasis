import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Therapist } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Badge } from './ui/badge';
import { MapPin, Star } from 'lucide-react';

interface TherapistCardProps {
  therapist: Therapist;
  onViewDetails: (therapist: Therapist) => void;
}

export function TherapistCard({ therapist, onViewDetails }: TherapistCardProps) {
  const avatar = PlaceHolderImages.find((img) => img.id === 'therapist-avatar');

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        {avatar && (
          <Image
            src={avatar.imageUrl}
            alt={therapist.name}
            width={80}
            height={80}
            className="rounded-full border-2 border-primary/20 object-cover"
            data-ai-hint={avatar.imageHint}
          />
        )}
        <div className="flex-1">
          <CardTitle className="text-xl mb-1">{therapist.name}</CardTitle>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{therapist.city}</span>
          </div>
          {therapist.rating && (
            <div className="flex items-center gap-1 mt-2 text-sm text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span>{therapist.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
            {therapist.about?.replace(/^About\s*/i, '') || 'No biography available.'}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
            {therapist.modes.map(mode => (
                <Badge key={mode} variant="secondary">{mode}</Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center bg-card">
        <div className="font-semibold text-primary">
            {formatCurrency(therapist.feeAmount, therapist.feeCurrency)}
            <span className="text-xs font-normal text-muted-foreground">/session</span>
        </div>
        <Button onClick={() => onViewDetails(therapist)}>
            View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
