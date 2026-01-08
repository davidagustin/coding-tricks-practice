import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ErrorHandler from '@/components/ErrorHandler';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/components/ThemeProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JavaScript & TypeScript Tricks Practice',
  description: 'Master advanced JavaScript and TypeScript patterns through hands-on practice',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.classList.toggle('dark', theme === 'dark');
                  } else {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.classList.toggle('dark', prefersDark);
                    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
                  }
                } catch (e) {
                  // Fallback to dark if localStorage is not available
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          <ThemeProvider>
            <ErrorHandler />
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
