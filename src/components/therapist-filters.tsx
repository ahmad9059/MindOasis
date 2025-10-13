'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { consultationModes, experienceLevels, feeRanges, FilterOptions } from '@/lib/types';
import { ScrollArea } from './ui/scroll-area';
import { X } from 'lucide-react';

interface TherapistFiltersProps {
  filterOptions: FilterOptions;
  className?: string;
}

export function TherapistFilters({ filterOptions, className }: TherapistFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (updates: { name: string; value: string | null }[]) => {
      const params = new URLSearchParams(searchParams.toString());
      updates.forEach(({ name, value }) => {
        if (value === null) {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      });
      return params.toString();
    },
    [searchParams]
  );
  
  const handleMultiSelectChange = (name: string, value: string, checked: boolean) => {
    const currentValues = searchParams.get(name)?.split(',') || [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);
    
    router.push(pathname + '?' + createQueryString([{ name, value: newValues.length > 0 ? newValues.join(',') : null }]));
  };

  const handleRadioChange = (name: string, value: string) => {
    router.push(pathname + '?' + createQueryString([{ name, value }]));
  };

  const clearFilters = () => {
    router.push(pathname);
  }

  const selectedCities = searchParams.get('cities')?.split(',') || [];
  const selectedModes = searchParams.get('modes')?.split(',') || [];
  const selectedGenders = searchParams.get('genders')?.split(',') || [];
  const selectedExperience = searchParams.get('experience');
  const selectedFee = searchParams.get('fee');

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters} disabled={!searchParams.toString()}>
            <X className="mr-2 h-4 w-4"/>
            Clear All
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-full">
        <div className="space-y-6 p-1">
          {/* City Filter */}
          <div>
            <h3 className="font-semibold mb-3">City</h3>
            <div className="space-y-2">
              {filterOptions.cities.map((city) => (
                <div key={city.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`city-${city.name}`}
                    checked={selectedCities.includes(city.name)}
                    onCheckedChange={(checked) => handleMultiSelectChange('cities', city.name, !!checked)}
                  />
                  <Label htmlFor={`city-${city.name}`} className="flex-grow">{city.name}</Label>
                  <span className="text-xs text-muted-foreground">{city.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Filter */}
          <div>
            <h3 className="font-semibold mb-3">Experience</h3>
            <RadioGroup value={selectedExperience || ''} onValueChange={(value) => handleRadioChange('experience', value)}>
              {experienceLevels.map((level) => (
                <div key={level.label} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.label} id={`exp-${level.label}`} />
                  <Label htmlFor={`exp-${level.label}`}>{level.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Gender Filter */}
          <div>
            <h3 className="font-semibold mb-3">Gender</h3>
            <div className="space-y-2">
              {filterOptions.genders.map((gender) => (
                <div key={gender.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${gender.name}`}
                    checked={selectedGenders.includes(gender.name)}
                    onCheckedChange={(checked) => handleMultiSelectChange('genders', gender.name, !!checked)}
                  />
                  <Label htmlFor={`gender-${gender.name}`} className="flex-grow">{gender.name}</Label>
                  <span className="text-xs text-muted-foreground">{gender.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Range Filter */}
          <div>
            <h3 className="font-semibold mb-3">Fee Range</h3>
            <RadioGroup value={selectedFee || ''} onValueChange={(value) => handleRadioChange('fee', value)}>
              {feeRanges.map((range) => (
                <div key={range.label} className="flex items-center space-x-2">
                  <RadioGroupItem value={range.label} id={`fee-${range.label}`} />
                  <Label htmlFor={`fee-${range.label}`}>{range.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Consultation Mode Filter */}
          <div>
            <h3 className="font-semibold mb-3">Consultation Mode</h3>
            <div className="space-y-2">
              {consultationModes.map((mode) => (
                <div key={mode} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mode-${mode}`}
                    checked={selectedModes.includes(mode)}
                    onCheckedChange={(checked) => handleMultiSelectChange('modes', mode, !!checked)}
                  />
                  <Label htmlFor={`mode-${mode}`}>{mode}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
