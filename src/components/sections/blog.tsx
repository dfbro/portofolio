import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BLOG_POSTS } from '@/lib/data';
import { Section } from './section-wrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Blog({ showAll = false, showMoreButton = false }: { showAll?: boolean, showMoreButton?: boolean }) {
  const postsToShow = showAll ? BLOG_POSTS : BLOG_POSTS.slice(0, 2);

  return (
    <Section id="blog" title="Blog & Articles">
      <div className="grid gap-8 md:grid-cols-2">
        {postsToShow.map((post) => (
          <Card key={post.title} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <CardHeader>
              {post.image && (
                <div className="aspect-video overflow-hidden rounded-t-lg border-b">
                  <Image
                    src={post.image.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                    data-ai-hint={post.image.imageHint}
                  />
                </div>
              )}
              <CardTitle className="pt-4">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{post.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="p-0 text-primary hover:text-primary/80">
                <Link href={post.link} target="_blank">
                  Read More &rarr;
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       {showMoreButton && !showAll && BLOG_POSTS.length > 2 && (
        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
}
