'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { type Therapist } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Phone, Mail, User, Briefcase, GraduationCap, Info, MessageSquare, Handshake, BrainCircuit } from 'lucide-react';
import { AiSummary } from './ai-summary';

interface TherapistDetailModalProps {
  therapist: Therapist | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TherapistDetailModal({ therapist, isOpen, onClose }: TherapistDetailModalProps) {
  if (!therapist) return null;

  const avatar = PlaceHolderImages.find((img) => img.id === 'therapist-avatar');

  const detailItems = [
    { icon: <User className="h-4 w-4" />, label: 'Gender', value: therapist.gender },
    { icon: <Briefcase className="h-4 w-4" />, label: 'Experience', value: therapist.experienceYears ? `${therapist.experienceYears} years` : 'N/A' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">{therapist.name}'s Profile</DialogTitle>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {avatar && (
              <Image
                src={avatar.imageUrl}
                alt={therapist.name}
                width={120}
                height={120}
                className="rounded-lg border-4 border-card object-cover shadow-md"
                data-ai-hint={avatar.imageHint}
              />
            )}
            <div className="flex-1">
              <h2 className="text-3xl font-headline font-bold text-primary">{therapist.name}</h2>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
                {detailItems.map(item => item.value && (
                  <div key={item.label} className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
               <div className="mt-3 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{therapist.city}</span>
              </div>
            </div>
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto px-6 pb-4">
            <div className="my-4 grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-lg border p-2">
                <div className="p-2 rounded flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary"/>
                    <div>
                        <div className="text-xs text-muted-foreground">Phone</div>
                        <a href={`tel:${therapist.phone}`} className="text-sm font-medium hover:underline">{therapist.phone || 'Not available'}</a>
                    </div>
                </div>
                <div className="p-2 rounded flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary"/>
                    <div>
                        <div className="text-xs text-muted-foreground">Email</div>
                        <a href={`mailto:${therapist.email}`} className="text-sm font-medium hover:underline truncate">{therapist.email || 'Not available'}</a>
                    </div>
                </div>
                <div className="p-2 rounded flex items-center gap-3">
                    <div className="text-2xl font-bold text-primary">{formatCurrency(therapist.feeAmount, therapist.feeCurrency)}</div>
                    <div>
                        <div className="text-xs text-muted-foreground">Fee</div>
                        <div className="text-sm font-medium">per session</div>
                    </div>
                </div>
            </div>

            <Accordion type="multiple" defaultValue={['item-1', 'item-5']} className="w-full">
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-base font-semibold"><Sparkles className="h-5 w-5 mr-2 text-primary"/>AI Summary</AccordionTrigger>
                <AccordionContent>
                  <AiSummary therapist={therapist} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-base font-semibold"><Info className="h-5 w-5 mr-2 text-primary"/>About</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-foreground/90">{therapist.about?.replace(/^About\s*/i, '') || 'Not available'}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-base font-semibold"><GraduationCap className="h-5 w-5 mr-2 text-primary"/>Education</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-foreground/90">{therapist.education || 'Not available'}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-base font-semibold"><Briefcase className="h-5 w-5 mr-2 text-primary"/>Experience</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-foreground/90">{therapist.experience || 'Not available'}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-base font-semibold"><BrainCircuit className="h-5 w-5 mr-2 text-primary"/>Expertise</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {therapist.expertise?.split(';').map(e => e.trim()).filter(Boolean).map(e => (
                       <Badge key={e} variant="secondary">{e}</Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-base font-semibold"><Handshake className="h-5 w-5 mr-2 text-primary"/>Consultation Modes</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {therapist.modes.length > 0 ? therapist.modes.map(mode => (
                       <Badge key={mode} variant="default">{mode}</Badge>
                    )) : <p className="text-sm text-muted-foreground">Not specified.</p>}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </div>

        <div className="p-6 pt-0 mt-auto bg-card border-t flex flex-col sm:flex-row gap-2">
          {therapist.phone && (
            <Button asChild className="flex-1" size="lg">
              <a href={`tel:${therapist.phone}`}><Phone className="mr-2 h-4 w-4" /> Call Now</a>
            </Button>
          )}
          {therapist.email && (
            <Button asChild variant="secondary" className="flex-1" size="lg">
              <a href={`mailto:${therapist.email}`}><Mail className="mr-2 h-4 w-4" /> Send Email</a>
            </Button>
          )}
          {therapist.profileUrl && (
            <Button asChild variant="ghost" className="flex-1" size="lg">
                <a href={therapist.profileUrl} target="_blank" rel="noopener noreferrer">Visit Profile</a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
