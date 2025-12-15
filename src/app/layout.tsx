import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Manrope } from 'next/font/google';
import { Sidebar } from '@/components/layout/sidebar';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'Binary Canvas',
  description: 'Portfolio of a Web Developer and CTF Player',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} font-body antialiased`}>
        <div className="relative flex min-h-screen">
          <Sidebar />
          <main className="flex-1 pl-0 md:pl-64">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
