'use client';

import { useState, useEffect, useTransition } from 'react';
import { Badge } from '@/components/ui/badge';
import { Section } from './section-wrapper';
import { SKILLS } from '@/lib/data';
import { aiHighlightSkills } from '@/ai/flows/highlight-skills';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Skills() {
  const [viewedSkills, setViewedSkills] = useState<string[]>([]);
  const [highlightedSkills, setHighlightedSkills] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

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
        {Object.entries(SKILLS).map(([category, skills]) => (
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
    </Section>
  );
}
