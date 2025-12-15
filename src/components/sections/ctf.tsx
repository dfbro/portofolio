import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CTF_ACHIEVEMENTS, ICONS } from '@/lib/data';
import { Section } from './section-wrapper';
import Link from 'next/link';
import Image from 'next/image';

export function Ctf() {
  return (
    <Section id="ctf" title="CTF Achievements">
      <div className="grid gap-8 md:grid-cols-2">
        {CTF_ACHIEVEMENTS.map((ctf) => (
          <Card key={ctf.event} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2">
            <CardHeader>
             {ctf.image && (
                <div className="aspect-video overflow-hidden rounded-t-lg border-b">
                  <Image
                    src={ctf.image.imageUrl}
                    alt={ctf.event}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                    data-ai-hint={ctf.image.imageHint}
                  />
                </div>
              )}
              <CardTitle className="pt-4">{ctf.event}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{ctf.rank}</span> - {ctf.date}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href={ctf.writeupUrl} target="_blank">
                  <ICONS.fileText className="mr-2 h-4 w-4" />
                  Read Write-up
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
