'use client';

import { useState, useTransition, FormEvent, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SmartSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearchTerm = searchParams.get('q') || '';

  const [inputValue, setInputValue] = useState(currentSearchTerm);
  const [isPending, startTransition] = useTransition();

  // This effect ensures that if the user navigates using browser buttons
  // (back/forward), the input field reflects the current URL search term.
  useEffect(() => {
    setInputValue(currentSearchTerm);
  }, [currentSearchTerm]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (inputValue) {
      params.set('q', inputValue);
    } else {
      params.delete('q');
    }
    
    startTransition(() => {
      // Using router.replace keeps the browser history clean.
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Smart Search: by name, expertise, or issue..."
        className="w-full pl-10"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isPending}
      />
    </form>
  );
}
