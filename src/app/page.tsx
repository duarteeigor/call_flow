import Image from "next/image";
import HomeImage from "../../public/abcd.png"
export default function Home() {
  return (
    <main className="h-screen pt-20 w-full bg-gradient-to-b from-[#050812] to-[#1b284bbd]">
      <div className="max-w-7xl  w-full mx-auto px-4  md:flex md:h-[60dvh] flex-row-reverse items-center justify-center">
        <div className="relative w-full h-80 sm:h-90 sm:w-10/12 md:h-115 md:w-full mb-5 mx-auto">
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
