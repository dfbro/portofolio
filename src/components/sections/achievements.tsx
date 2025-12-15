import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ACHIEVEMENTS } from '@/lib/data';
import { Section } from './section-wrapper';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PREVIEW_COUNT = 3;

export function Achievements({ showAll = false }: { showAll?: boolean }) {
  const achievementsToShow = showAll ? ACHIEVEMENTS : ACHIEVEMENTS.slice(0, PREVIEW_COUNT);

  return (
    <Section id="achievements" title="Achievements">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {achievementsToShow.map((achievement) => (
          <Card key={achievement.title} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <CardHeader>
              {achievement.image && (
                <div className="aspect-video overflow-hidden rounded-t-lg border-b">
                  <Image
                    src={achievement.image.imageUrl}
                    alt={achievement.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                    data-ai-hint={achievement.image.imageHint}
                  />
                </div>
              )}
              <CardTitle className="pt-4">{achievement.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{achievement.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{achievement.organization}</Badge>
                <Badge variant="secondary">{achievement.date}</Badge>
              </div>
            </CardContent>
            {achievement.url && (
              <CardFooter className="flex justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href={achievement.url} target="_blank">
                    View Certificate
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
      {!showAll && ACHIEVEMENTS.length > PREVIEW_COUNT && (
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
