import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Chatbot } from '@/components/chatbot';

export const metadata: Metadata = {
  title: 'Mind Oasis',
  description: 'Find Your Path to Mental Wellness in Pakistan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='hsl(221 78% 61%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 5a3 3 0 1 0-5.993.129'/%3E%3Cpath d='M12 5a3 3 0 1 0 5.993.129'/%3E%3Cpath d='M15 13a3 3 0 1 0-5.993.129'/%3E%3Cpath d='M15 13a3 3 0 1 0 5.993.129'/%3E%3Cpath d='M12 21a3 3 0 1 0-5.993.129'/%3E%3Cpath d='M12 21a3 3 0 1 0 5.993.129'/%3E%3Cpath d='M6 8V6'/%3E%3Cpath d='M6 18v-2'/%3E%3Cpath d='M18 8V6'/%3E%3Cpath d='M18 18v-2'/%3E%3Cpath d='M9 13h6'/%3E%3Cpath d='M9 5h6'/%3E%3Cpath d='M9 21h6'/%3E%3C/svg%3E" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Chatbot />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
