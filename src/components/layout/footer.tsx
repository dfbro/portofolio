'use client';

import { useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/data';
import { Button } from '@/components/ui/button';

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Code2 className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {year || new Date().getFullYear()} Binary Canvas. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map((social) => (
            <a
              href={social.url}
              key={social.name}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              <Button variant="ghost" size="icon">
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </Button>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
