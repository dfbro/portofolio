'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold">Binary Canvas</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden items-center gap-2 md:flex">
             {SOCIAL_LINKS.map((social) => (
                <a href={social.url} key={social.name} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    <Button variant="ghost" size="icon">
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.name}</span>
                    </Button>
                </a>
            ))}
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex h-full flex-col py-6">
                <Link href="/" className="mb-8 flex items-center" onClick={() => setIsOpen(false)}>
                  <Code2 className="h-6 w-6 text-primary" />
                  <span className="ml-2 font-bold">Binary Canvas</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex items-center justify-center gap-4">
                    {SOCIAL_LINKS.map((social) => (
                        <a href={social.url} key={social.name} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                            <Button variant="ghost" size="icon">
                                <social.icon className="h-6 w-6" />
                                <span className="sr-only">{social.name}</span>
                            </Button>
                        </a>
                    ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
