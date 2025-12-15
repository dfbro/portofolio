import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Blog as BlogSection } from '@/components/sections/blog';

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <BlogSection showAll={true} />
      </main>
      <Footer />
    </div>
  );
}
