import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, CheckCircle, FileText, Bot, HandHelping, Users, HeartHandshake } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Header } from '@/components/header';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');
  const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us-image');
  const ctaImage = PlaceHolderImages.find((img) => img.id === 'cta-image');

  const howItWorks = [
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      step: 1,
      title: 'Explore Professionals',
      description: 'Use our smart search and detailed filters to find therapists that match your needs.',
    },
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      step: 2,
      title: 'Get AI-Powered Insights',
      description: 'Review concise, AI-generated summaries of therapist profiles to make informed decisions.',
    },
    {
      icon: <HandHelping className="h-10 w-10 text-primary" />,
      step: 3,
      title: 'Connect and Heal',
      description: 'Reach out to your chosen therapist to begin your journey towards mental wellness.',
    },
  ];

  const testimonials = [
    {
      quote: "MindCare helped me find a therapist who truly understands me. The process was simple and stress-free.",
      author: "Aisha K.",
      location: "Lahore"
    },
    {
      quote: "The AI summaries are a game-changer. I could quickly get a sense of each therapist's approach and specialty.",
      author: "Bilal S.",
      location: "Karachi"
    },
    {
      quote: "Finally, a platform that understands the mental health landscape in Pakistan. Highly recommended!",
      author: "Fatima Z.",
      location: "Islamabad"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                Find Your Path to Mental Wellness
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Discover compassionate and qualified mental health professionals across Pakistan. Start your journey towards a healthier mind today.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/search">
                  Find a Therapist <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative h-64 md:h-auto md:w-full aspect-square">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-contain"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-24 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <p className="font-semibold text-primary uppercase tracking-wider">How it Works</p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mt-2">
                Find Your Therapist in 3 Simple Steps
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Our platform makes it easy to find the right mental health professional for you.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((item) => (
                <Card key={item.step} className="text-center p-6 border-2 border-transparent hover:border-primary hover:shadow-xl transition-all">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About MindCare Pakistan</h2>
                <p className="mt-4 text-lg text-muted-foreground">We are dedicated to breaking down barriers to mental healthcare, offering a platform that is accessible, confidential, and culturally sensitive for everyone in Pakistan.</p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Verified Professionals</h3>
                      <p className="text-muted-foreground">Connect with qualified and vetted mental health experts from across Pakistan.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <HeartHandshake className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Confidential & Secure</h3>
                      <p className="text-muted-foreground">Our process prioritizes your privacy and security every step of the way.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Community & Support</h3>
                      <p className="text-muted-foreground">Join a supportive community and access resources to help you on your journey.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 w-full">
                {aboutImage && (
                  <Image src={aboutImage.imageUrl} alt={aboutImage.description} fill className="object-cover rounded-lg" data-ai-hint={aboutImage.imageHint}/>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 sm:py-24 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Trusted by Users Across Pakistan</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">See how MindCare is helping people find the support they need.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <p className="text-foreground italic">"{testimonial.quote}"</p>
                    <p className="font-semibold mt-4">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24">
            <div className="container">
                <div className="relative rounded-lg bg-primary text-primary-foreground overflow-hidden">
                    <div className="absolute inset-0">
                        {ctaImage && <Image src={ctaImage.imageUrl} alt={ctaImage.description} fill className="object-cover" data-ai-hint={ctaImage.imageHint} />}
                        <div className="absolute inset-0 bg-primary/80"></div>
                    </div>
                    <div className="relative p-12 md:p-16 text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to Take the First Step?</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">Find a therapist and start your journey to mental wellness today. Our platform is free to use.</p>
                        <Button asChild variant="secondary" size="lg" className="mt-8">
                            <Link href="/search">
                                Start Your Search <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="border-t bg-secondary">
        <div className="container py-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} MindCare Pakistan. A Hackathon Project.</p>
        </div>
      </footer>
    </div>
  );
}
