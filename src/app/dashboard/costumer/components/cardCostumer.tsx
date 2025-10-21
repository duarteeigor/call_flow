"use client"

import { CostumerProps } from "@/utils/types/costumer";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export function CardCostumer({ costumer }: { costumer: CostumerProps }) {
    const router = useRouter()

    async function handleDelete() {
        try {
            const response = await fetch(`/api/costumer?id=${costumer.id}`, {
                method: "DELETE",

            })
            if(!response.ok){
                toast.error("Não é possível excluir um cliente com chamados em aberto")
                return
            }
            
            router.refresh()
            toast.success("Cliente excluido com sucesso!")
        } catch (error) {
            throw new Error("erro")
        }
    }

    return (
        <>

            <article key={costumer.id} className=" flex flex-col gap-1 bg-slate-100 shadow-md p-3 rounded-md">
                <div className="flex gap-2">
                    <strong>Nome:</strong>
                    <span>{costumer.name}</span>
                </div>

                <div className="flex gap-2">
                    <strong>Email:</strong>
                    <span>{costumer.email}</span>
                </div>

                <div className="flex gap-2">
                    <strong>Telefone:</strong>
                    <span>{costumer.phone}</span>
                </div>

                <button onClick={handleDelete} className="py-1 px-4 self-start text-sm text-white bg-red-500 rounded-md mt-2 hover:scale-105 duration-200  cursor-pointer">Deletar</button>
            </article>

        </>

    )
}