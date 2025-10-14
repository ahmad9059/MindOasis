'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, X, User } from 'lucide-react';
import type { Therapist } from '@/lib/types';
import Link from 'next/link';
import { useDebounce } from '@/hooks/use-debounce';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface SmartSearchBarProps {
    allTherapists: Therapist[];
}

export function SmartSearchBar({ allTherapists }: SmartSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearchTerm = searchParams.get('q') || '';
  const avatarHint = PlaceHolderImages.find((img) => img.id === 'therapist-avatar')?.imageHint;

  const [inputValue, setInputValue] = useState(currentSearchTerm);
  const [suggestions, setSuggestions] = useState<Therapist[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedInputValue = useDebounce(inputValue, 300);
  const searchContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setInputValue(currentSearchTerm);
  }, [currentSearchTerm]);

  useEffect(() => {
    if (debouncedInputValue) {
      const filtered = allTherapists.filter(therapist => 
        therapist.name.toLowerCase().includes(debouncedInputValue.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [debouncedInputValue, allTherapists]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (inputValue) {
      params.set('q', inputValue);
    } else {
      params.delete('q');
    }
    
    router.replace(`${pathname}?${params.toString()}`);
    setIsFocused(false);
  };

  const handleClearSearch = () => {
    setInputValue('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    router.replace(`${pathname}?${params.toString()}`);
    setSuggestions([]);
  }

  return (
    <div className="relative w-full" ref={searchContainerRef}>
        <form onSubmit={handleSearchSubmit}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
            type="search"
            placeholder="Smart Search: by name, expertise, or issue..."
            className="w-full pl-10 pr-10"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
        />
        {inputValue && (
            <button 
                type="button" 
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2"
            >
                <X className="h-5 w-5 text-muted-foreground hover:text-foreground"/>
            </button>
        )}
        </form>
        {isFocused && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-card border rounded-lg shadow-lg z-10">
                <ul className="divide-y">
                    {suggestions.map(therapist => (
                        <li key={therapist.id}>
                            <Link href={`/search?q=${encodeURIComponent(therapist.name)}`}
                                  onClick={() => setIsFocused(false)}
                                  className="flex items-center gap-3 p-3 hover:bg-accent transition-colors">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={`https://picsum.photos/seed/${therapist.id}/40/40`} alt={therapist.name} data-ai-hint={avatarHint || 'portrait professional'} />
                                    <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <p className="font-semibold">{therapist.name}</p>
                                    <p className="text-muted-foreground">{therapist.city}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  );
}
