import { Header } from '@/components/header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Anxiety: Symptoms and Coping Mechanisms',
      date: 'October 26, 2023',
      author: 'Dr. Ayesha Khan',
      excerpt: 'Anxiety is a common human emotion, but when it becomes overwhelming, it can disrupt your daily life. Learn to recognize the signs and discover effective coping strategies.',
      image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=2070&auto=format&fit=crop',
      imageHint: 'calm person meditating',
      tags: ['Anxiety', 'Mental Health', 'Coping'],
    },
    {
      id: 2,
      title: 'The Importance of Seeking Help: Breaking the Stigma in Pakistan',
      date: 'October 20, 2023',
      author: 'Ahmed Raza',
      excerpt: 'Cultural stigma often prevents people from seeking help for mental health issues. This post explores why reaching out is a sign of strength and how we can foster a more supportive community.',
      image: 'https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=80&w=2069&auto=format&fit=crop',
      imageHint: 'support group hands',
      tags: ['Stigma', 'Community', 'Support'],
    },
    {
      id: 3,
      title: 'Mindfulness for Beginners: A Guide to a More Present Life',
      date: 'October 15, 2023',
      author: 'Fatima Ali',
      excerpt: 'Mindfulness is the practice of being present in the moment. This simple guide will walk you through the basics and help you incorporate mindfulness into your daily routine.',
      image: 'https://images.unsplash.com/photo-1474418397713-7e15e4d5e156?q=80&w=2072&auto=format&fit=crop',
      imageHint: 'person walking in nature',
      tags: ['Mindfulness', 'Wellness', 'Self-Care'],
    },
    {
      id: 4,
      title: 'Navigating Relationship Challenges with Couples Counseling',
      date: 'October 10, 2023',
      author: 'Dr. Ayesha Khan',
      excerpt: 'Every relationship has its ups and downs. Discover how couples counseling can provide a safe space for communication, understanding, and healing.',
      image: 'https://images.unsplash.com/photo-1567443024551-f3e291257163?q=80&w=2070&auto=format&fit=crop',
      imageHint: 'couple talking together',
      tags: ['Relationships', 'Couples Therapy'],
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Mind Oasis Blog</h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                Insights, stories, and advice on mental health and wellness from our experts.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-56 w-full">
                    <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" data-ai-hint={post.imageHint} />
                </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <CardTitle className="text-xl font-bold leading-snug">
                  <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <div className="text-sm text-muted-foreground flex items-center gap-2 pt-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>{post.date} by {post.author}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0">
                    <Link href={`/blog/${post.id}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <footer className="border-t bg-secondary">
        <div className="container py-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Mind Oasis. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
