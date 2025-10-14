import Image from "next/image";
import HomeImage from "../../public/abc.png"
export default function Home() {
  return (
    <main className="h-screen pt-20 w-full bg-gradient-to-b from-[#141C36] via-[#21356A] to-[#1D4E3A]">
      <div className="max-w-7xl w-full mx-auto px-4 md:flex h-[60dvh] flex-row-reverse items-center justify-center">
        <div className="relative w-full h-80 md:h-100 ">
          <Image
            src={HomeImage}
            alt=""
            priority
            quality={100}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div>
          <h2 className="text-2xl text-gray-200 md:text-3xl">CALLFLOW: GERENCIAMENTO INTELIGENTE DE CHAMADOS</h2>
          <h3 className="text-gray-400">Conectando clientes e soluções em tempo real</h3>
        </div>
      </div>
    </main>
  );
}
