'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Section } from './section-wrapper';
import { aiHighlightSkills } from '@/ai/flows/highlight-skills';
import { Loader2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSkills } from '@/app/admin/skills/actions';

export function Skills({ showMoreButton = false }: { showMoreButton?: boolean }) {
  const [skillsData, setSkillsData] = useState<Record<string, string[]>>({});
  const [viewedSkills, setViewedSkills] = useState<string[]>([]);
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getSkills().then(data => {
        if (data) {
            setSkillsData(data);
        }
    });
  }, []);

  useEffect(() => {
    if (viewedSkills.length > 0) {
      startTransition(async () => {
        const { highlightedSkills: newHighlights } = await aiHighlightSkills({ viewedSkills });
        setHighlightedSkills(newHighlights);
      });
    }
  }, [viewedSkills]);

  const handleSkillClick = (skill: string) => {
    setViewedSkills((prev) => [...new Set([...prev, skill])]);
  };

  return (
    <Section id="skills" title="Technical Skills">
       <div className="flex justify-center mb-8">
         <p className="max-w-2xl text-center text-muted-foreground">
            I have a diverse skill set spanning web development and cybersecurity. Click on a skill to see related ones highlighted by AI.
            {isPending && <Loader2 className="ml-2 inline-block h-4 w-4 animate-spin" />}
        </p>
       </div>
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
                  variant={highlightedSkills.includes(skill) ? 'default' : 'secondary'}
                  className="cursor-pointer text-base transition-all hover:scale-105 active:scale-95"
                  onClick={() => handleSkillClick(skill)}
                  aria-pressed={highlightedSkills.includes(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
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
