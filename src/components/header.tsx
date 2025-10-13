import { Logo } from '@/components/logo';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <ThemeToggle />
      </div>
    </header>
  );
}
