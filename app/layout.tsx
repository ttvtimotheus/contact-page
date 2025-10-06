import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contact Clarik - Privacy at Clinical Level",
  description: "Get in touch with Clarik for individuals, families, practices, and clinics. Privacy-focused healthcare solutions.",
  keywords: ["Clarik", "contact", "healthcare", "privacy", "clinical"],
  openGraph: {
    title: "Contact Clarik - Privacy at Clinical Level",
    description: "Get in touch with Clarik for individuals, families, practices, and clinics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
