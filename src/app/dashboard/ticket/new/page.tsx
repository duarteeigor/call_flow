import Link from "next/link";


export default function NewTicket() {
    //Creating form like server component
    return (
        <div className="max-w-7xl w-full mx-auto px-5 md:pl-20 md:pr-4 2xl:p-0">
            <div className="w-full  bg-amber-100">
                <section className="flex items-center gap-4 mb-10">
                    <Link href={"/dashboard"}>
                        <button
                            className="py-2 px-3 text-sm text-white bg-[#6F78F5] rounded-md cursor-pointer
                        hover:scale-105 duration-200">
                            Voltar
                        </button>
                    </Link>

                    <h2 className="text-2xl md:text-4xl font-medium">Novo chamado</h2>
                </section>

                <section>
                    <form className="flex flex-col">
                        <label>Nome do chamado</label>
                        <input 
                            className=" w-full p-2 border-2 border-slate-200 rounded-md outline-none"
                            placeholder="Digite o nome..."
                            required 
                        />

                        <label>Descreva o problema</label>
                        <textarea
                            className=" w-full resize-none h-20 p-2 border-2 border-slate-200 rounded-md outline-none"
                            placeholder="Descrição..."
                            required 
                        />

                        <label>Selecione o cliente</label>
                        <select className="w-full  border-2 border-slate-200 p-2 rounded-md outline-none ">
                            <option value="cliente1">Cliente 1</option>
                        </select>
                    </form>
                </section>
            </div>
        </div>
    )
}