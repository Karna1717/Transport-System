import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Toaster} from "@/components/ui/toaster";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TranspoEase',
  description: 'Simplify and streamline parcel and courier booking, tracking, and management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 bg-background z-10 border-b">
          <div className="container mx-auto py-4 px-6 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              TranspoEase
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/">Home</Link>
              <Link href="/book">Book Now</Link>
              <Link href="/track">Track Parcel</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="bg-secondary py-12">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">About Us</h4>
              <p className="text-muted-foreground">
                TranspoEase is dedicated to simplifying your shipping needs with fast and reliable courier services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <p className="text-muted-foreground">
                Email: support@transpoease.com
                <br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Links</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><a href="#" className="hover:underline">Social Media</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8 text-muted-foreground">
            © {new Date().getFullYear()} TranspoEase. All rights reserved.
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
