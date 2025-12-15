'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Section } from './section-wrapper';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Trophy } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const PREVIEW_COUNT = 3;

type Achievement = {
  id: string;
  title: string;
  description: string;
  organization: string;
  date: string;
  url: string;
  imageUrl?: string;
};

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [achievement.imageUrl]);

  return (
     <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <CardHeader className="p-0">
        {achievement.imageUrl && !imageError ? (
            <div className="aspect-video overflow-hidden rounded-t-lg border-b">
                <Image
                src={achievement.imageUrl}
                alt={achievement.title}
                width={600}
                height={400}
                className="h-full w-full object-cover"
                data-ai-hint="achievement image"
                onError={() => setImageError(true)}
                />
            </div>
        ) : (
            <div className="aspect-video overflow-hidden rounded-t-lg border-b bg-muted flex items-center justify-center">
                <Trophy className="h-16 w-16 text-muted-foreground" />
            </div>
        )}
        <div className="p-6 pb-0">
          <CardTitle>{achievement.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <p className="text-muted-foreground">{achievement.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{achievement.organization}</Badge>
          <Badge variant="secondary">{achievement.date}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-6 pt-0">
          {achievement.url && achievement.url !== '#' && (
            <Button asChild variant="outline" size="sm">
                <Link href={achievement.url} target="_blank">
                Download Certificate
                </Link>
            </Button>
          )}
        </CardFooter>
    </Card>
  );
}


export function Achievements({ showAll = false }: { showAll?: boolean }) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        setLoading(true);
        const response = await fetch('/api/achievements');
        if (!response.ok) {
          throw new Error('Failed to fetch achievements');
        }
        const data = await response.json();
        setAchievements(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error("Failed to fetch achievements:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  const achievementsToShow = showAll ? achievements : achievements.slice(0, PREVIEW_COUNT);
  const totalAchievements = achievements.length;

  if (loading) {
    return (
      <Section id="achievements" title="Achievements">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader className="p-0">
                <Skeleton className="h-[215px] w-full rounded-t-lg" />
                 <div className="p-6">
                    <Skeleton className="h-8 w-3/4" />
                 </div>
              </CardHeader>
              <CardContent className="flex-grow space-y-2 p-6 pt-0">
                <Skeleton className="h-4 w-full" />
                <div className="mt-4 flex flex-wrap gap-2 pt-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
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
      <Section id="achievements" title="Achievements">
        <p className="text-center text-destructive">{error}</p>
      </Section>
    )
  }

  return (
    <Section id="achievements" title="Achievements">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {achievementsToShow.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
      {!showAll && totalAchievements > PREVIEW_COUNT && (
        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/achievements">
              View All Achievements
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
}
