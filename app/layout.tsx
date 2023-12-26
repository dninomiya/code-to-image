import type { Metadata } from 'next';
import './globals.css';
import GithubLink from '@/app/components/github-link';
import { ThemeProvider } from '@/app/providers/theme-provider';
import AuthorLink from '@/app/components/author-link';
import AppProvider from '@/app/providers/app-provider';
import MobileGuard from '@/app/components/mobile-guard';
import { AppConfig } from '@/app.config';

export const metadata: Metadata = {
  metadataBase: new URL('https://dninomiya.github.io'),
  title: 'Code to Image',
  description: 'Code to Image',
  openGraph: {
    title: 'Code to Image',
    description: 'Code to Image',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <MobileGuard>{children}</MobileGuard>
          </AppProvider>
        </ThemeProvider>
        <AuthorLink />
        <GithubLink
          href={`https://github.com/dninomiya/${AppConfig.repo}/tree/main`}
        />
      </body>
    </html>
  );
}
