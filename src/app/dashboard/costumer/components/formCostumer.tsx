"use client"

import { useForm } from "react-hook-form"
import { email, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/input"
import { useRouter } from "next/navigation"

const schema = z.object({
    name: z.string().nonempty("Campo obrigatorio em branco"),
    phone: z.string().min(11, "Telefone muito curto")
        .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Formato de telefone inválido"),
    email: z.email("Digite um email valido"),
    address: z.string()

})

type FormData = z.infer<typeof schema>


export function NewCostumerForm() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function onSubmit(data: FormData) {
        try {
            const response = await fetch(`/api/costumer`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address
                })
            })

            if(response.ok){
                router.refresh()
                router.replace("/dashboard/costumer")
            }
        } catch (error) {
            throw new Error("Failed to create new Costumer")
        }

    }
    

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                <div>
                    <Input
                        label="Nome completo"
                        type="text"
                        name="name"
                        regiser={register}
                        placeholder="Digite o nome..."
                        error={errors.name?.message}
                    />
                </div>


                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">

                        <Input
                            label="Telefone"
                            type="tel"
                            name="phone"
                            placeholder="Exemplo (xx) 9999-9999"
                            regiser={register}
                            error={errors.phone?.message}
                        />
                    </div>

                    <div className="flex flex-col flex-1">

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="Digite o email..."
                            regiser={register}
                            error={errors.email?.message}
                        />
                    </div>
                </div>

                <div>

                    <Input
                        label="Endereço"
                        type="text"
                        name="address"
                        placeholder="Digite o endereço completo..."
                        regiser={register}
                        error={errors.address?.message}
                    />
                </div>

                <button type="submit" className="w-full p-2 mt-10 bg-[#1A2B42] text-white rounded-md hover:scale-105 duration-200 cursor-pointer">Cadastrar</button>

            </form>
        </div>
    )
}