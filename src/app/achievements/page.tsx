import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Achievements as AchievementsSection } from '@/components/sections/achievements';

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AchievementsSection showAll={true} />
      </main>
      <Footer />
    </div>
  );
}
