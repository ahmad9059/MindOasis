'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import therapistsData from '@/data/therapists.json';
import type { Therapist, FilterOptions } from '@/lib/types';
import { experienceLevels, feeRanges } from '@/lib/types';

import { TherapistFilters } from '@/components/therapist-filters';
import { TherapistList } from '@/components/therapist-list';
import { TherapistDetailModal } from '@/components/therapist-detail-modal';
import Loading from './loading';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { SmartSearchBar } from '@/components/smart-search-bar';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

  const searchTerm = searchParams.get('q') || '';
  
  const filterOptions = useMemo((): FilterOptions => {
    const cities = new Map<string, number>();
    const genders = new Map<string, number>();
    const mainCities = ['Karachi', 'Lahore', 'Islamabad'];

    therapistsData.forEach((therapist) => {
      // City count
      const city = mainCities.includes(therapist.city) ? therapist.city : 'Other';
      cities.set(city, (cities.get(city) || 0) + 1);

      // Gender count
      if (therapist.gender) {
        genders.set(therapist.gender, (genders.get(therapist.gender) || 0) + 1);
      }
    });

    return {
      cities: Array.from(cities.entries()).map(([name, count]) => ({ name, count })).sort((a,b) => b.count - a.count),
      genders: Array.from(genders.entries()).map(([name, count]) => ({ name, count })),
    };
  }, []);
  
  const filteredTherapists = useMemo(() => {
    const query = searchTerm.toLowerCase();
    const selectedCities = searchParams.get('cities')?.split(',') || [];
    const selectedGenders = searchParams.get('genders')?.split(',') || [];
    const selectedModes = searchParams.get('modes')?.split(',') || [];
    const selectedExperience = searchParams.get('experience');
    const selectedFee = searchParams.get('fee');
    const mainCities = ['Karachi', 'Lahore', 'Islamabad'];

    return (therapistsData as Therapist[]).filter(therapist => {
      // Search term filter
      if (query) {
        const searchableContent = [
          therapist.name,
          therapist.expertise,
          therapist.education,
          therapist.about,
        ].join(' ').toLowerCase();
        if (!searchableContent.includes(query)) {
          return false;
        }
      }

      // City filter
      if (selectedCities.length > 0) {
        const therapistCityCategory = mainCities.includes(therapist.city) ? therapist.city : 'Other';
        if (!selectedCities.includes(therapistCityCategory)) {
          return false;
        }
      }

      // Gender filter
      if (selectedGenders.length > 0 && (!therapist.gender || !selectedGenders.includes(therapist.gender))) {
        return false;
      }
      
      // Mode filter
      if (selectedModes.length > 0 && !selectedModes.some(mode => therapist.modes.includes(mode))) {
          return false;
      }

      // Experience filter
      if (selectedExperience) {
        const level = experienceLevels.find(l => l.label === selectedExperience);
        if (level) {
          const exp = therapist.experienceYears;
          if (exp === null || exp < level.min || exp >= level.max) {
            return false;
          }
        }
      }

      // Fee filter
      if (selectedFee) {
        const range = feeRanges.find(r => r.label === selectedFee);
        if (range) {
          const fee = therapist.feeAmount;
          if (fee === null || fee < range.min || fee > range.max) {
            return false;
          }
        }
      }

      return true;
    });
  }, [searchTerm, searchParams]);

  const handleViewDetails = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
  };
  
  const handleCloseModal = () => {
    setSelectedTherapist(null);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container py-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Mobile filter sheet */}
            <div className="lg:hidden flex justify-between items-center gap-4">
                <div className="flex-grow"><SmartSearchBar allTherapists={therapistsData as Therapist[]} /></div>
                <Sheet>
                    <SheetTrigger asChild>
                    <Button variant="outline" className="shrink-0">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[320px] sm:w-[400px] p-0">
                        <TherapistFilters filterOptions={filterOptions} className="border-none shadow-none" />
                    </SheetContent>
                </Sheet>
            </div>
            
            {/* Desktop filters */}
            <aside className="hidden lg:block lg:w-1/4 xl:w-1/5 sticky top-20 self-start">
              <TherapistFilters filterOptions={filterOptions} className="h-auto max-h-[calc(100vh-6rem)]"/>
            </aside>

            {/* Results */}
            <div className="w-full lg:w-3/4 xl:w-4/5">
              <div className="mb-6 space-y-4">
                <div className="hidden lg:block"><SmartSearchBar allTherapists={therapistsData as Therapist[]} /></div>
                <h2 className="text-xl font-semibold">
                  {`${filteredTherapists.length} therapists found`}
                </h2>
              </div>
              <TherapistList therapists={filteredTherapists} onViewDetails={handleViewDetails} />
            </div>
          </div>
        </div>
      </main>
      <TherapistDetailModal
        isOpen={!!selectedTherapist}
        onClose={handleCloseModal}
        therapist={selectedTherapist}
      />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPageContent />
    </Suspense>
  )
}
