import { Inter } from "next/font/google";
import "./globals.css";
import TagManager from "react-gtm-module";
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
      <body className={inter.className}>
        {children}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTM_ID}');
            `,
          }}
        />
      </body>
    </html>
  );
}
