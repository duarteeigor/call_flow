"use client"

import { TicketProps } from "@/utils/types/ticket"
import { CircleCheckBigIcon, Pencil } from "lucide-react"

export function TableDashboard({tickets}: {tickets: TicketProps[]}){
    return(
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
                                    <CircleCheckBigIcon size={22} color="gray" />
                                    <Pencil size={22} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}