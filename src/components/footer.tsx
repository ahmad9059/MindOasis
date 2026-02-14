import Link from 'next/link';
import { Logo } from './logo';
import { Button } from './ui/button';
import { Facebook, Github, Heart, Linkedin, Twitter } from 'lucide-react';

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
    { href: 'https://github.com/ahmad9059', icon: <Github className="h-5 w-5" />, label: 'GitHub' },
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
            <ul className="space-y-2">
                {socialLinks.map((link) => (
                    <li key={link.label}>
                        <a href={link.href} aria-label={link.label} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                            {link.icon}
                            <span>{link.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Mind Oasis. Made With
            <Heart className="mx-1 inline-block h-4 w-4 fill-[#4881DD] text-[#4881DD] align-[-2px]" aria-hidden="true" />
            by{' '}
            <a
              href="https://github.com/ahmad9059"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              ahmad9059
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
