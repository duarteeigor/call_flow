
import { prisma } from "@/lib/prisma";
import { TableDashboard } from "../../components/TableDashboard";
import { TicketProps } from "@/utils/types/ticket";
import { auth } from "@/auth";

export default async function HistoryTickets(){
    const session = await auth()
    const tickets = await prisma.ticket.findMany({
        where: {
            user_id: session?.user?.id 
        }, include: {
            costumer: true
        }, orderBy :{
            created_at: "desc"
        }
    })
return(
    <div className="max-w-7xl w-full mx-auto px-5 md:pl-20 md:pr-4 2xl:p-0">
        <div className="w-full flex flex-col">
            <div className="mb-10">
                <h2 className="text-2xl md:text-4xl font-medium">Histórico de chamados</h2>
            </div>

            <section>
                {tickets && (
                    <TableDashboard tickets={tickets} />
                )}
            </section>
        </div>
    </div>
)
}