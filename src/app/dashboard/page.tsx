import { auth } from "@/auth"
import { redirect } from "next/navigation"

import { CircleCheckBigIcon, Pencil } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { TicketProps } from "@/utils/types/ticket"
import { TableDashboard } from "./components/TableDashboard"

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

            <TableDashboard tickets={tickets} />
        </div>
    )
}