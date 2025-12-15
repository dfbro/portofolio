
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ICONS } from '@/lib/data';
import { Section } from './section-wrapper';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const PREVIEW_COUNT = 2;

type Writeup = {
  id: string;
  event: string;
  rank: string;
  date: string;
  writeupUrl: string;
  imageUrl?: string;
};

function WriteupCard({ writeup }: { writeup: Writeup }) {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [writeup.imageUrl]);

    return (
        <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <CardHeader className="p-0">
                {writeup.imageUrl && !imageError ? (
                <div className="aspect-video overflow-hidden rounded-t-lg border-b">
                    <Image
                        src={writeup.imageUrl}
                        alt={writeup.event}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover"
                        data-ai-hint="ctf event image"
                        onError={() => setImageError(true)}
                    />
                </div>
                 ) : (
                <div className="aspect-video overflow-hidden rounded-t-lg border-b bg-muted flex items-center justify-center">
                    <ICONS.fileText className="h-16 w-16 text-muted-foreground" />
                </div>
            )}
            <div className="p-6 pb-0">
              <CardTitle>{writeup.event}</CardTitle>
            </div>
            </CardHeader>
            <CardContent className="flex-grow p-6">
                <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{writeup.rank}</span> - {writeup.date}
                </p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                {writeup.writeupUrl && writeup.writeupUrl !== '#' && (
                    <Button asChild variant="outline">
                        <Link href={writeup.writeupUrl} target="_blank">
                        <ICONS.fileText className="mr-2 h-4 w-4" />
                        Read Write-up
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

export function Ctf({ showAll = false }: { showAll?: boolean }) {
  const [writeups, setWriteups] = useState<Writeup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWriteups() {
      try {
        setLoading(true);
        const response = await fetch('/api/writeups');
        if (!response.ok) {
          throw new Error('Failed to fetch writeups');
        }
        const data = await response.json();
        setWriteups(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error("Failed to fetch writeups:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWriteups();
  }, []);

  const writeupsToShow = showAll ? writeups : writeups.slice(0, PREVIEW_COUNT);
  const totalWriteups = writeups.length;

  if (loading) {
    return (
      <Section id="ctf" title="CTF WriteUps">
        <div className="grid gap-8 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader className="p-0">
                <Skeleton className="h-[215px] w-full rounded-t-lg" />
                 <div className="p-6">
                    <Skeleton className="h-8 w-3/4" />
                 </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 p-6 pt-0">
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter className="flex justify-start">
                <Skeleton className="h-9 w-32" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section id="ctf" title="CTF WriteUps">
        <p className="text-center text-destructive">{error}</p>
      </Section>
    );
  }

  return (
    <Section id="ctf" title="CTF WriteUps">
      <div className="grid gap-8 md:grid-cols-2">
        {writeupsToShow.map((writeup) => (
          <WriteupCard key={writeup.id} writeup={writeup} />
        ))}
      </div>
      {!showAll && totalWriteups > PREVIEW_COUNT && (
        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/ctf">
              View All Write-ups
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
}
