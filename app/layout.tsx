import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Iesa Wazeer',
    template: '%s · Iesa Wazeer',
  },
  description:
    'London-based engineer. Building cool stuff, founding nilu inc.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="name">
            Iesa Wazeer
          </Link>
          <nav>
            <Link href="/about/">About</Link>
            <Link href="/working-with-me/">Working with me</Link>
            <Link href="/blog/">Blog</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <a href="https://github.com/izman48">GitHub</a> ·{' '}
          <a href="https://www.linkedin.com/in/iesa-wazeer/">LinkedIn</a> ·
          Discord <code>izman48</code>
        </footer>
      </body>
    </html>
  );
}
