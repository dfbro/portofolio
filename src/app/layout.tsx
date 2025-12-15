import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Manrope } from 'next/font/google';
import { Sidebar } from '@/components/layout/sidebar';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

const protocol = process.env.APP_SSL === 'true' ? 'https' : 'http';
const appHostname = process.env.APP_HOSTNAME || 'localhost:9002';
const appUrl = `${protocol}://${appHostname}`;

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: 'Portfolio',
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
          <main className="flex-1 md:pl-64">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
