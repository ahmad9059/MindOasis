import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Contact Us</h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                We're here to help. Reach out to us with your questions, feedback, or inquiries.
            </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" placeholder="Ayesha" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Khan" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="ayesha@example.com" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="Question about services" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Your message..." rows={5} />
                        </div>
                        <Button type="submit" className="w-full" size="lg">Send Message</Button>
                    </form>
                </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
                <Card>
                    <CardHeader className='flex-row items-center gap-4'>
                        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                            <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Our Office</CardTitle>
                            <p className="text-muted-foreground">123 Wellness Avenue, DHA Phase 6, Karachi, Pakistan</p>
                        </div>
                    </CardHeader>
                </Card>
                 <Card>
                    <CardHeader className='flex-row items-center gap-4'>
                        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Email Us</CardTitle>
                            <a href="mailto:support@mindoasis.pk" className="text-muted-foreground hover:text-primary">support@mindoasis.pk</a>
                        </div>
                    </CardHeader>
                </Card>
                 <Card>
                    <CardHeader className='flex-row items-center gap-4'>
                        <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                            <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Call Us</CardTitle>
                            <a href="tel:+923001234567" className="text-muted-foreground hover:text-primary">+92 (300) 123-4567</a>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </div>
      </main>
       <footer className="border-t bg-secondary mt-12">
        <div className="container py-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Mind Oasis. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
