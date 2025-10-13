import Link from 'next/link';
import { Logo } from './logo';
import { Button } from './ui/button';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/search', label: 'Find a Therapist' },
  ];

  const socialLinks = [
    { href: '#', icon: <Facebook className="h-5 w-5" />, label: 'Facebook' },
    { href: '#', icon: <Twitter className="h-5 w-5" />, label: 'Twitter' },
    { href: '#', icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <div className="md:col-span-1 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your trusted partner in the journey towards mental wellness in Pakistan.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>123 Wellness Avenue, Karachi</p>
              <p>Email: <a href="mailto:support@mindoasis.pk" className="hover:text-primary">support@mindoasis.pk</a></p>
              <p>Phone: <a href="tel:+923001234567" className="hover:text-primary">+92 300 1234567</a></p>
            </div>
          </div>
          
          {/* Column 4: Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-2">
                {socialLinks.map((link) => (
                    <Button key={link.label} asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                        <a href={link.href} aria-label={link.label}>
                            {link.icon}
                        </a>
                    </Button>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mind Oasis. A Hackathon Project. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
