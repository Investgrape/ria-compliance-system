import { Inter } from 'next/font/google';
import { ComplianceProvider } from '@/contexts/ComplianceContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RIA Compliance System',
  description: 'Compliance management system for Registered Investment Advisors'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ComplianceProvider>{children}</ComplianceProvider>
      </body>
    </html>
  );
}