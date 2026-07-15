import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Configura a fonte Inter para um visual moderno e limpo
const inter = Inter({ subsets: ["latin"], weight: ['400', '700', '900'] });

// Define o título e a descrição que aparecem na aba do navegador
export const metadata: Metadata = {
  title: "Placar AAAITA | Olimpiada Interna",
  description: "Acompanhe os placares e o ranking da Olimpiada Interna em tempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-50 antialiased`}>
        <Navbar />
        {/* A tag main define a area de conteudo, garantindo que o footer fique embaixo */}
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}