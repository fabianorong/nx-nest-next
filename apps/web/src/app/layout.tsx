import * as React from 'react';
import Navbar from '@/src/components/navbar';
import './global.css';
import { getSession } from '../lib/session';
import Providers from './Providers';

export const metadata = {
  title: 'Welcome to web',
  description: 'Generated by create-nx-workspace',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="h-screen flex">
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 bg-[#692746]">
              {session && <Navbar />}
            </div>
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
