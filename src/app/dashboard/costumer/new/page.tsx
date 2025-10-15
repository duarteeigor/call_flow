import Link from "next/link";
import { NewCostumerForm } from "../components/formCostumer";


export default function NewCostumer() {
    return (
        <div className="max-w-7xl w-full flex flex-col mx-auto px-5 md:pl-20 md:pr-2">
            <section className="flex gap-4 items-center mb-20">
                <Link href={"/dashboard/costumer"}>
                    <button
                        className="py-1 px-4 rounded-md bg-[#6F78F5] text-white text-sm
                            hover:scale-105 duration-200 cursor-pointer">
                        Voltar
                    </button>
                </Link>

                <h2 className="text-2xl md:text-4xl font-medium">Novo Cliente</h2>
            </section>

            <section>
                <NewCostumerForm />
            </section>
        </div>
    )
}