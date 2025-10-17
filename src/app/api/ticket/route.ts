import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH(request: Request){
    const session = await auth()

    if(!session) return NextResponse.json({message: "Login is required to this operation"}, {status: 400})
    
    //This way, the id is being received from the body. This can be done by 2 ways
    //The other way consists the backend receive the id from the params, using searchparams like on delete costumer
    //(but is needed change frontend fetch passing the id with query params instead of sent from body)
    const {id} = await request.json()
    
    try {
        await prisma.ticket.update({
        where: {
            id: id
        },
        data: {
            status: "fechado"
        }
    })
    return NextResponse.json({message: "status updated"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error on update"}, {status: 400})
    }
}