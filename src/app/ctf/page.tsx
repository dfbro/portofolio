import { Ctf as CtfSection } from '@/components/sections/ctf';

export default function CtfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <CtfSection showAll={true} />
      </main>
    </div>
  );
}
