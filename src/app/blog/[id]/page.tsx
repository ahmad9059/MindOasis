import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Header } from '@/components/header';
import { Badge } from '@/components/ui/badge';
import { getBlogPosts } from '@/lib/blog';
import { Footer } from '@/components/footer';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPosts().find((p) => p.id.toString() === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container py-12 max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="flex items-center text-primary hover:underline gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>{post.date}</span>
                </div>
            </div>
             <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
          </header>
          
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" data-ai-hint={post.imageHint} />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
