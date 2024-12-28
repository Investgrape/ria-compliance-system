import './globals.css';

export const metadata = {
  title: 'RIA Compliance System',
  description: 'Compliance management system for Registered Investment Advisors'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}