import { Header } from '@/components/layout/header';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { Ctf } from '@/components/sections/ctf';
import { Achievements } from '@/components/sections/achievements';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Projects />
        <Achievements />
        <Ctf />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
