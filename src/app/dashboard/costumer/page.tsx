import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { CardCostumer } from "./components/cardCostumer"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function Costumer() {
    const session = await auth()

    if (!session) {
        redirect("/")
    }

    const response = await prisma.costumer.findMany({
        where: {
            user_id: session.user?.id
        }
    })

    return (
        <div className="max-w-7xl w-full mx-auto px-5  md:pl-20 md:pr-4 2xl:pl-0 2xl:pr-0">
            <div className="w-full   max-w-7xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl md:text-4xl font-medium">Meus clientes</h2>
                    <Link href={"/dashboard/costumer/new"}>
                        <button
                            className="p-2 px-2 md:px-6 bg-[#6F78F5] text-white rounded-md 
                            hover:scale-105 cursor-pointer transition-transform duration-200">
                            Novo Cliente
                        </button>
                    </Link>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                    {response && response.map((data)=>(
                        <CardCostumer key={data.id} costumer={data} />
                    ))}

                </section>

                {response.length < 1 &&(
                    <span className="text-sm text-gray-600">Nenhum cliente cadastrado</span>
                )}
            </div>
        </div>
    )
}