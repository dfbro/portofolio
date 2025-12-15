import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const portfolioName = process.env.NEXT_PUBLIC_PORTFOLIO_NAME || "Alex Doe";

  return (
    <section id="home" className="container flex flex-col items-center justify-center py-24 text-center sm:py-32 md:py-48">
      <h1 className="font-headline text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        {portfolioName}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
        A creative Web Developer and passionate CTF Player, building secure and performant applications for the modern web.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="#projects">
            View My Work <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="#contact">
            Get In Touch
          </Link>
        </Button>
      </div>
    </section>
  );
}
