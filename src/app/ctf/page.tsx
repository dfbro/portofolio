import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Ctf as CtfSection } from '@/components/sections/ctf';

export default function CtfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <CtfSection showAll={true} />
      </main>
      <Footer />
    </div>
  );
}
