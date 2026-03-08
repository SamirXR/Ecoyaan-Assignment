import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecoyaan',
  description: 'Sustainability made easy. Shop eco-friendly products on Ecoyaan.',
  icons: {
    icon: 'https://prod-cdn.ecoyaan.com/pb-cs-app/images/ecoyaan-favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 border-b border-emerald-50/70 bg-white/85 backdrop-blur-xl h-16 flex items-center shadow-sm">
          <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Real Ecoyaan favicon */}
              <img
                src="https://prod-cdn.ecoyaan.com/pb-cs-app/images/ecoyaan-favicon.ico"
                alt="Ecoyaan"
                width={34}
                height={34}
                className="rounded-full object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[17px] tracking-tight text-emerald-950">Ecoyaan</span>
                <span className="text-[11px] font-medium text-emerald-600 tracking-wide">Sustainability made easy</span>
              </div>
            </div>

            <div className="hidden sm:flex text-sm font-medium text-emerald-800/80 gap-4">
              <span>Support</span>
              <span>Returns</span>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full flex justify-center py-5 px-4 sm:px-6 md:py-8">
          {children}
        </main>
      </body>
    </html>
  );
}