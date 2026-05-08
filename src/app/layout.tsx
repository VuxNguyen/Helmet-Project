import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LocaleProvider } from "@/components/locale-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Helmet Pro — Mũ bảo hiểm xe máy cao cấp",
    template: "%s | Helmet Pro",
  },
  description:
    "Khám phá bộ sưu tập mũ bảo hiểm xe máy cao cấp của chúng tôi. An toàn kết hợp phong cách với Helmet Pro — tuyển chọn những mũ bảo hiểm chất lượng nhất cho mọi chuyến đi.",
  keywords: [
    "mũ bảo hiểm xe máy",
    "mũ bảo hiểm cao cấp",
    "đồ bảo hộ lái xe",
    "cửa hàng mũ bảo hiểm",
    "an toàn xe máy",
  ],
  authors: [{ name: "Helmet Pro" }],
  creator: "Helmet Pro",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Helmet Pro",
    title: "Helmet Pro — Mũ bảo hiểm xe máy cao cấp",
    description:
      "Khám phá bộ sưu tập mũ bảo hiểm xe máy cao cấp của chúng tôi. An toàn kết hợp phong cách.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Helmet Pro — Mũ bảo hiểm xe máy cao cấp",
    description:
      "Khám phá bộ sưu tập mũ bảo hiểm xe máy cao cấp của chúng tôi. An toàn kết hợp phong cách.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <LocaleProvider />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
