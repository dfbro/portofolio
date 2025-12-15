'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Code2 } from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const portfolioName = process.env.NEXT_PUBLIC_PORTFOLIO_NAME || 'Alex Doe';
  const profilePictureUrl =
    process.env.NEXT_PUBLIC_PROFILE_PICTURE_URL ||
    'https://picsum.photos/seed/pfp/200/200';
  const [isSheetOpen, setSheetOpen] = useState(false);

  const getLinkClass = (href: string) => {
    const isHomePage = pathname === '/';
    const isCurrentPage = isHomePage ? href === '/' : pathname === href;

    return cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary-foreground hover:bg-sidebar-accent',
      {
        'bg-sidebar-accent text-sidebar-primary-foreground': isCurrentPage,
      }
    );
  };

  const SidebarContent = () => (
    <>
      <div className="flex flex-col items-center p-6">
        <Link href="/" className="mb-4">
          <Image
            src={profilePictureUrl}
            alt={portfolioName}
            width={96}
            height={96}
            className="rounded-full object-cover shadow-lg border-2 border-sidebar-border"
            data-ai-hint="profile picture"
            priority
          />
        </Link>
        <h2 className="text-xl font-bold text-sidebar-primary-foreground">
          {portfolioName}
        </h2>
      </div>
      <nav className="grid items-start px-4 text-sm font-medium">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={getLinkClass(link.href)}
            onClick={() => setSheetOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto flex justify-center gap-2 p-4">
        {SOCIAL_LINKS.map((social) => (
          <a
            href={social.url}
            key={social.name}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:text-sidebar-primary-foreground hover:bg-sidebar-accent">
              <social.icon className="h-5 w-5" />
              <span className="sr-only">{social.name}</span>
            </Button>
          </a>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header and Sheet */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
         <Link href="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold">Binary Canvas</span>
          </Link>
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col bg-sidebar text-sidebar-foreground w-3/4">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r bg-sidebar md:flex">
        <SidebarContent />
      </aside>
    </>
  );
}
