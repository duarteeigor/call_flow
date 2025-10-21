import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request){

    //If we pass to request body the user_id, we can destructure here 
    const {name, description, costumer_id} = await request.json()

    if(!name || !description || !costumer_id){
            throw new Error("Required fields are empty")
        }
    
    try {  
        //this fetch only is needed if we didnt get the user_id by frontend,

        //here we can get the user that contains the costumer with the costumer_id received by frontend with this query, and use it to create a ticket below
        const user = await prisma.user.findFirst({
            where: {
                costumers: {
                    some: {
                        id: costumer_id
                    }
                }
            }
        })

        if(!user){
            throw new Error("User_id cannot be found")
        }

        const response = await prisma.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                status: "aberto",
                costumer_id: costumer_id,
                user_id: user?.id 
            },
        })

        if(!response){
            throw new Error("Cannot post")
        }
        

        return NextResponse.json({message: "Post ticket was successfully"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Unexpected error"}, {status: 500})
    }
}


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