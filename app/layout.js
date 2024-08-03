import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { CSPostHogProvider } from "./page";

export const metadata = {
  title: "Pantry Tracker AI",
  description:
    "Add/Remove pantry items and generate recipes based on it with Llama 3.1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={inter.className}>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
