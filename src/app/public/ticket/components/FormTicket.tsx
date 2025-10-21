"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/input"
import { Search } from "lucide-react"
import toast from "react-hot-toast"


export function FormTicket({ costumer_id }: { costumer_id: string }) {
    const schema = z.object({
        title: z.string().trim().nonempty("É obrigatório um título para o chamado"),
        describe: z.string().trim().nonempty("É obrigatório uma descrição para o chamado")
    })

    type FormData = z.infer<typeof schema>

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function onSubmit(data: FormData) {
        console.log(data)

        try {
            const response = await fetch("/api/ticket", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: data.title,
                    description: data.describe,
                    costumer_id
                })
            })

            const res = await response.json()

            if (!response.ok) {
                throw new Error(res.message || "Erro inesperado")
            }

            reset()
            toast.success("Chamado cadastrado com sucesso!")
        } catch (error) {
            console.error(error instanceof Error && error.message)
        }
    }
    return (
        <form className="max-w-2xl w-full bg-slate-200 rounded-lg p-6 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="Titulo"
                placeholder="Digite o titulo do chamado..."
                type="text"
                name="title"
                register={register}
                error={errors.title?.message}

            />
            <div>
                <label className={`${errors.describe?.message ? "text-red-500" : ""}`}>Descrição</label>
                <textarea
                    className={`w-full resize-none h-20 p-2 border-2 mt-2 rounded-md outline-none bg-white ${errors.describe ? "border-red-500" : "border-slate-100"}`}
                    placeholder="Descreva o seu problema..."
                    {...register("describe")}
                />
                <p className="text-sm text-red-500">{errors.describe?.message}</p>
            </div>

            <button
                type="submit"
                className="w-full p-2 rounded-md bg-[#1A2B42] text-white flex items-center justify-center gap-3 mt-5 cursor-pointer
                hover:scale-102 transition-transform duration-200">
                Cadastrar<Search size={22} color="#fff" />
            </button>

        </form>
    )
}