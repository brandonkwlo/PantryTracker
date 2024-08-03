import { Inter } from "next/font/google";
import "./globals.css";
import { Script } from "next/script";

const GTM_ID = process.env.GOOGLE_ANALYTICS;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Tracker AI",
  description:
    "Add/Remove pantry items and generate recipes based on it with Llama 3.1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTM_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
