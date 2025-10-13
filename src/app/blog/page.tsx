import { Header } from '@/components/header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBlogPosts } from '@/lib/blog';
import { Footer } from '@/components/footer';

export default function BlogPage() {
  const blogPosts = getBlogPosts();

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
      <Footer />
    </div>
  );
}
