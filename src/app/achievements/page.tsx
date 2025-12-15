import { Achievements as AchievementsSection } from '@/components/sections/achievements';

export default function AchievementsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <AchievementsSection showAll={true} />
      </main>
    </div>
  );
}
