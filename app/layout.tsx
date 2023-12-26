import type { Metadata } from 'next';
import './globals.css';
import GithubLink from '@/app/components/github-link';
import AuthorLink from '@/app/components/author-link';

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
    <html lang="en">
      <body>
        {children}
        <AuthorLink />
        <GithubLink href="https://github.com/dninomiya/code-to-image/tree/main" />
      </body>
    </html>
  );
}
