import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth";

export async function GET(request: Request){

    const {searchParams} = new URL(request.url)
    const email = searchParams.get("email")

        try {

            const response = await prisma.costumer.findFirst({
                where:{
                    email: email as string
                }
            })
            if(!response) {
                return NextResponse.json({message: "Costumer not found"}, {status: 404})
            }
            
            return NextResponse.json(response)
        } catch (error) {
            return NextResponse.json({message: "Internal error"})
        }
}

export async function POST(request: Request) {
    const session = await auth()


    // if(!session){
    //     return NextResponse.json({error: "Not authorized"}, {status: 401})
    // }

    const { name, email, phone, address } = await request.json();

    try {
        await prisma.costumer.create({
            data: {
                name,
                email,
                phone,
                address: address ?? " ",
                user_id: session?.user?.id
            }
        })

        return NextResponse.json({ message: "Costumer created successfull" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Failed create new costumer" }, { status: 400 })
    }

}

export async function DELETE(request: Request){
        const {searchParams} = new URL(request.url)
        const user_id = searchParams.get("id")
        
        try {
            const findTickets = await prisma.ticket.findFirst({
                where: {
                    costumer_id: user_id,
                    status: "aberto"
                }
            })

            if(findTickets) return NextResponse.json({message: "Cannot delete an costumer that has a open ticket"}, {status: 400})

            await prisma.ticket.deleteMany({
                where: {
                    costumer_id: user_id,
                    NOT: {
                        status: "abeto"
                    }
                }
            })    
            await prisma.costumer.delete({
                where: {
                    id: user_id as string
                }
            })

            return NextResponse.json({message: "Costumer deleted successfully"})
            
        } catch (error) {
            return NextResponse.json({message: error})
        }
   
}