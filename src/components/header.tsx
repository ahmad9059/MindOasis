import { Logo } from '@/components/logo';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container flex h-16 items-center">
        <Logo />
      </div>
    </header>
  );
}
