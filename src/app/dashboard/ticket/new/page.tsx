import Link from "next/link";
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CostumerProps } from "@/utils/types/costumer";


export default async function NewTicket() {
    //Creating form like server component

    const session = await auth()
    if (!session) {
        redirect("/")
    }

    let costumers: CostumerProps[]

    try {
        const response = await prisma.costumer.findMany({
            where: {
                user_id: session.user?.id
            }
        })
        costumers = response
    } catch (error) {
        throw new Error("Request failed")
    }

    async function handleAction(formData: FormData) {
        "use server"

        const name = formData.get("name")
        const description = formData.get("description")
        const costumerId = formData.get("costumer")

        //adding fields on db

        if (!name || !description || !costumerId) return

        try {
            await prisma.ticket.create({
                data: {
                    name: name as string,
                    description: description as string,
                    costumer_id: costumerId as string,
                    status: "aberto",
                    user_id: session?.user?.id
                }
            })
            redirect("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="max-w-7xl w-full mx-auto px-5 md:pl-20 md:pr-4 2xl:p-0">
            <div className="w-full">
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
                    <form className="flex flex-col" action={handleAction}>
                        <label>Nome do chamado</label>
                        <input
                            className=" w-full p-2 border-2 border-slate-200 rounded-md outline-none"
                            placeholder="Digite o nome..."
                            type="text"
                            name="name"
                            required
                        />

                        <label>Descreva o problema</label>
                        <textarea
                            className=" w-full resize-none h-20 p-2 border-2 border-slate-200 rounded-md outline-none"
                            placeholder="Descrição..."
                            name="description"
                            required
                        />

                        {costumers.length !== 0 ? (
                            <>
                                <label>Selecione o cliente</label>
                                <select
                                    className="w-full  border-2 border-slate-200 p-2 rounded-md outline-none"
                                    name="costumer">
                                    {costumers && costumers.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </>
                        ) : (
                            <span className="my-4">Você ainda não cadastrou nenhum cliente.<Link className="text-blue-500 hover:text-blue-900" href={"/dashboard/costumer/new"}> Cadastrar cliente</Link></span>
                        )}

                        <button
                            className="w-full p-2 text-white bg-[#6F78F5] rounded-md cursor-pointer mt-4
                            hover:scale-102 duration-200 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:scale-100"
                            disabled={costumers.length === 0}
                            type="submit">
                            Cadastrar
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )
}