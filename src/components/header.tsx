import { Logo } from '@/components/logo';
import { ThemeToggle } from './theme-toggle';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight, FileText, Info, Mail } from 'lucide-react';

export function Header() {
  const navLinks = [
    { href: '/about', label: 'About', icon: <Info className="size-4" /> },
    { href: '/blog', label: 'Blog', icon: <FileText className="size-4" /> },
    { href: '/contact', label: 'Contact', icon: <Mail className="size-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/search">
                Find a Therapist <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
