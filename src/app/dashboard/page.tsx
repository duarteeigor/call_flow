import { auth } from "@/auth"
import { redirect } from "next/navigation"

import { Trash, Pencil } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { TicketProps } from "@/utils/types/ticket"

export default async function Dashboard() {
    const session = await auth()

    if (!session) {
        redirect("/")
    }

    const tickets = await prisma.ticket.findMany({
        where: {
            user_id: session.user?.id,
            status: "aberto"
        },
        include: {
            costumer: true
        }
    })

    return (
        <div className="max-w-7xl w-full  mx-auto px-5 md:pl-20 md:pr-4  2xl:pl-0 2xl:pr-0">
            <div className="w-full flex justify-between items-center mb-10">
                <h2 className=" text-2xl md:text-4xl font-medium">Chamados</h2>
                <Link href={"/dashboard/ticket/new"}>
                    <button
                        className="p-2 px-2 md:px-6 bg-[#6F78F5] text-white rounded-md 
                        hover:scale-105 cursor-pointer transition-transform duration-200">
                        Cadastrar
                    </button>
                </Link>
            </div>

            <table className="w-full">
                <thead className="">
                    <tr className="">
                        <th className="px-4 py-2 text-left font-semibold">CLIENTE</th>
                        <th className="px-4 py-2 text-left font-semibold hidden sm:table-cell">DATA CADASTRO</th>
                        <th className="px-4 py-2 text-left font-semibold">STATUS</th>
                        <th className="px-4 py-2 text-left font-semibold">#</th>
                    </tr>
                </thead>

                <tbody>
                    {tickets && tickets.map((ticket) => (
                        <tr key={ticket.id}
                            className="border-b-2 border-b-slate-200 h-16  last:border-b-0 bg-slate-100 
                            hover:bg-slate-200 transition-colors duration-300 cursor-pointer">
                            <td className="px-4 py-2 text-left">{ticket.name}</td>
                            <td className="px-4 py-2 text-left hidden sm:table-cell">{ticket.created_at?.toLocaleDateString("pt-br")}</td>
                            <td className="px-4 py-2 text-left"><span className="p-2 bg-[#B4E8D7] text-sm font-medium rounded-md">{ticket.status.toUpperCase()}</span></td>
                            <td className="px-4 py-2 text-left">
                                <div className="flex gap-2">
                                    <Trash size={22} color="red" />
                                    <Pencil size={22} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}