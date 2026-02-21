import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import Header from '@/components/Header/Header';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: 'GitHub Explorer',
  description: 'Search for users on GitHub and view their repositories, followers, and following.',
};

interface Props {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang='en' className={inter.className}>
      <body className=''>
        <Header />
        {children}
      </body>
    </html>
  );
}
