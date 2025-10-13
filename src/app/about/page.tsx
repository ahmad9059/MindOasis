import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, HeartHandshake, Users, Scale, Eye } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Footer } from '@/components/footer';

export default function AboutPage() {
    const aboutImage = PlaceHolderImages.find((img) => img.id === 'about-us-image');
    const team = [
        { name: 'Dr. Ayesha Khan', role: 'Founder & Lead Psychiatrist', avatar: 'https://picsum.photos/seed/team1/200/200' },
        { name: 'Ahmed Raza', role: 'Lead Clinical Psychologist', avatar: 'https://picsum.photos/seed/team2/200/200' },
        { name: 'Fatima Ali', role: 'Head of Operations', avatar: 'https://picsum.photos/seed/team3/200/200' },
    ];
    
    const values = [
        { icon: <HeartHandshake className="h-8 w-8 text-primary"/>, title: 'Compassion', description: 'We approach every interaction with empathy, understanding, and kindness.' },
        { icon: <CheckCircle className="h-8 w-8 text-primary"/>, title: 'Accessibility', description: 'We strive to make quality mental healthcare available to everyone in Pakistan.' },
        { icon: <Users className="h-8 w-8 text-primary"/>, title: 'Inclusivity', description: 'We celebrate diversity and provide a safe space for all individuals.' },
        { icon: <Scale className="h-8 w-8 text-primary"/>, title: 'Integrity', description: 'We uphold the highest ethical standards in confidentiality and professional conduct.' },
        { icon: <Eye className="h-8 w-8 text-primary"/>, title: 'Vision', description: 'To create a society where mental health is prioritized and stigma is eliminated.' }
    ]

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 text-center bg-secondary">
          <div className="container">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">About Mind Oasis</h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
              Your trusted partner in the journey towards mental wellness. We are dedicated to connecting individuals across Pakistan with qualified, compassionate, and culturally sensitive mental health professionals.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-24">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-80 w-full rounded-lg overflow-hidden">
                    {aboutImage && <Image src={aboutImage.imageUrl} alt={aboutImage.description} layout="fill" objectFit="cover" data-ai-hint={aboutImage.imageHint} />}
                </div>
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Mission</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Our mission is to break down the barriers to mental healthcare in Pakistan. We aim to create a safe, confidential, and accessible platform where anyone can find the support they need without fear of judgment or stigma. By leveraging technology and a network of verified professionals, we are making mental wellness a tangible reality for all.
                    </p>
                </div>
            </div>
        </section>
        
        {/* Our Values Section */}
        <section className="py-16 sm:py-24 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Core Values</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Our principles guide every decision we make and every interaction we have.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="text-center p-6 border-0 shadow-none bg-transparent">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>


        {/* Team Section */}
        <section className="py-16 sm:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Meet Our Team</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                We are a passionate team of professionals dedicated to mental health advocacy.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {team.map((member) => (
                <Card key={member.name} className="text-center p-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
