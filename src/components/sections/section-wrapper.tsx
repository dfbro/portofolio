import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function Section({ id, title, children, className, titleClassName }: SectionProps) {
  return (
    <section id={id} className={cn("container py-16 md:py-24", className)}>
      <h2 className={cn("mb-12 text-center font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl", titleClassName)}>
        {title}
      </h2>
      {children}
    </section>
  );
}
