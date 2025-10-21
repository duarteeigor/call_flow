"use client"

import { Input } from "@/components/input";
import { Search, X } from "lucide-react"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormTicket } from "./components/FormTicket";
import toast from "react-hot-toast";

interface CostumerTicketProps {
    id: string,
    name: string,
    // user_id: string
}

export default function PublicTicket() {
    const [costumer, setCostumer] = useState<CostumerTicketProps | null>()

    const schema = z.object({
        email: z.email("Digite um email válido"),
        ticket: z.string("Campos obrigatórios em branco").optional(),
        describe: z.string("Campo obrigatoio em branco").optional()
    })

    type FormData = z.infer<typeof schema>

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function getCostumer(data: FormData) {
        //there is two ways to get this user_id. The first way consists in get this property from this request and destructure below in response.json
        const response = await fetch(`/api/costumer?email=${data.email}`, {
            method: "GET"
        })

        const { id, name } = await response.json() as CostumerTicketProps;

        if(!response.ok){
            setError('email', { type: "custom", message: "Cliente não existe"})
            toast.error("Cliente não encontrado com o email especificado")
            return
        }

        //after destructured, we can store it on state (remember update the interface CostumerTicketProps with this new property)
        setCostumer({
            id: id,
            name: name,
            // user_id: user_id
        })

    }

    function handleClose() {
        reset()
        setCostumer(null)
    }
    return (
        <div className="pt-20 max-w-7xl w-full mx-auto">
            <div className="flex flex-col justify-center items-center gap-8 px-5">
                <h2 className="text-2xl md:text-4xl">Abrir chamado</h2>

                {costumer && (
                    <div className="bg-slate-200 w-full max-w-2xl rounded-md p-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <strong>Ciente selecionado: </strong>
                                <span>{costumer.name}</span>
                            </div>

                            <X size={22} color="red" onClick={handleClose} className="hover:scale-115 cursor-pointer transition-transform duration-200" />
                        </div>
                    </div>
                )}



                {!costumer && (
                    <form className="max-w-2xl w-full bg-slate-200 rounded-lg p-6" onSubmit={handleSubmit(getCostumer)}>
                        <Input
                            placeholder="Digite o email do cliente..."
                            type="text"
                            name="email"
                            register={register}
                            error={errors.email?.message}

                        />

                        <button type="submit" className="w-full p-2 rounded-md bg-[#1A2B42] text-white flex items-center justify-center gap-3 mt-5">Procurar clientes <Search size={22} color="#fff" /></button>


                    </form>
                )}


                {costumer && (
                    <FormTicket costumer_id={costumer.id} />
                )}




            </div>
        </div>
    )
}