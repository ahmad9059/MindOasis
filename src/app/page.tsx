import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, CheckCircle, Filter, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: 'Verified Professionals',
      description: 'Connect with qualified and vetted mental health experts from across Pakistan.',
    },
    {
      icon: <Filter className="h-8 w-8 text-primary" />,
      title: 'Filter by Your Needs',
      description: 'Narrow down your search by city, specialty, fee, and more to find the perfect match.',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Insights',
      description: 'Get AI-generated summaries of therapist profiles to make informed decisions faster.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <Button asChild>
            <Link href="/search">
              Find a Therapist <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-[60vh] min-h-[500px] w-full">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container text-center">
              <div className="max-w-3xl mx-auto bg-background/50 backdrop-blur-sm p-8 rounded-lg">
                <h1 className="text-4xl font-headline font-extrabold tracking-tight md:text-6xl text-primary-foreground">
                  <span className="text-primary">Mind</span> Oasis
                </h1>
                <h2 className="mt-4 text-5xl font-headline font-bold tracking-tight md:text-7xl">
                  Find Your Path to Wellness
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Discover compassionate and qualified mental health professionals in Pakistan.
                  Start your journey towards a healthier mind today.
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link href="/search">
                    Explore Therapists <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">
                A Better Way to Find Care
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Our platform is designed to make finding a therapist simple, transparent, and effective.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Mind Oasis. A Hackathon Project.</p>
        </div>
      </footer>
    </div>
  );
}
