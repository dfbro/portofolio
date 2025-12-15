'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Section } from './section-wrapper';
import { Loader2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Skills({ showMoreButton = false }: { showMoreButton?: boolean }) {
  const [skillsData, setSkillsData] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/skills');
        const data = await response.json();
        setSkillsData(data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <Section id="skills" title="Technical Skills">
       <div className="flex justify-center mb-8">
         <p className="max-w-2xl text-center text-muted-foreground">
            I have a diverse skill set spanning web development and cybersecurity.
        </p>
       </div>
      {loading ? (
         <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
         </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {Object.entries(skillsData).map(([category, skills]) => (
            <Card key={category} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge
                    key={skill}
                    variant='secondary'
                    className="text-base"
                    >
                    {skill}
                    </Badge>
                ))}
                </CardContent>
            </Card>
            ))}
        </div>
      )}
      {showMoreButton && (
        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/skills">
              See Full Skillset
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  );
}
