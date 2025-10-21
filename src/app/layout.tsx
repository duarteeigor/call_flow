import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import { Toaster } from "react-hot-toast";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Callflow - Gerenciamento de chamados de forma ágil e eficaz",
  description: "Callflow - Gerenciamento de chamados de forma ágil e eficaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased`}
      >
        <AuthProvider>
          <ModalProvider>
            <Toaster position="top-center" />
            <Header />
            {children}
          </ModalProvider>
        </AuthProvider>



      </body>
    </html>
  );
}
