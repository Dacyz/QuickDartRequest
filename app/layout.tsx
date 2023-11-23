import "../public/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quick Dart Request",
  description:
    "Gestión de peticiones HTTP y generación parametrizada de clases y tipos de datos desde objetos JSON a Dart",
  icons: "logo.ico",
  authors: [
    { name: "Diego Arturo Yangua Merino", url: "https://github.com/Dacyz" },
  ],
  category: "Herramientas de Desarrollo",
  classification: "Desarrollo de Software",
  // other: {
  //   repository: "https://github.com/Dacyz/quick-dart-request",
  //   version: "1.0.0",
  //   documentation: "https://github.com/Dacyz/quick-dart-request/docs",
  // },
  keywords: ["Dart", "HTTP Requests", "JSON to Dart", "Development Tools"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
