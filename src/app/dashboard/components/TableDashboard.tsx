"use client"

import { ModalContext } from "@/providers/modal"
import { TicketProps } from "@/utils/types/ticket"
import { CircleCheckBigIcon, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export function TableDashboard({ tickets }: { tickets: TicketProps[] }) {
    const router = useRouter()
    const { changeVisible, getTicket } = useContext(ModalContext)

    function handleGetDataModal(ticket: TicketProps) {
        changeVisible()
        getTicket(ticket)
    }

    async function handleChangeStatus(id: string) {

        await fetch(`/api/ticket`, {
            method: "PATCH",
            headers: {
                "Content-type": "application.json"
            },
            body: JSON.stringify({
                id
            })
        })

        router.refresh()
    }
    return (
        <table className="w-full">
            <thead className="">
                <tr className="">
                    <th className="px-4 py-2 text-left font-semibold">CLIENTE</th>
                    <th className="px-4 py-2 text-left font-semibold hidden sm:table-cell">DATA CADASTRO</th>
                    <th className="px-4 py-2 text-left font-semibold">STATUS</th>
                    <th className="px-4 py-2 text-center font-semibold">#</th>
                </tr>
            </thead>

            <tbody>
                {tickets && tickets.map((ticket) => (
                    <tr key={ticket.id}
                        className="border-b-2 border-b-slate-200 h-16  last:border-b-0 bg-slate-100 
                            hover:bg-slate-200 transition-colors duration-300 cursor-pointer">
                        <td className="px-4 py-2 text-left">{ticket.costumer?.name}</td>
                        <td className="px-4 py-2 text-left hidden sm:table-cell">{ticket.created_at?.toLocaleDateString("pt-br")}</td>
                        <td className="px-4 py-2 text-left"><span className={`p-2 text-sm font-medium rounded-md text-white ${ticket.status === "aberto" ? "bg-[#4CAF50]" : "bg-[#ABB2B9]"}`}>{ticket.status.toUpperCase()}</span></td>
                        <td className="px-4 py-2 text-left">
                            <div className="flex gap-4 items-center justify-center">
                                {ticket.status !== "fechado" && <CircleCheckBigIcon className="hover:scale-115 transition-transform duration-200" size={22} color="gray" onClick={() => handleChangeStatus(ticket.id)} />}
                                <Pencil className="hover:scale-115 transition-transform duration-200" onClick={() => handleGetDataModal(ticket)} size={22} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}