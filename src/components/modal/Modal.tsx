"use client"

import { ModalContext } from "@/providers/modal"
import { useContext } from "react"

export function Modal() {
    const { changeVisible, ticket } = useContext(ModalContext)
    return (
        <section className="absolute w-full min-h-screen bg-black/70 z-[99]" onClick={changeVisible}>
            <div className="absolute inset-0 flex justify-center items-center">

                <div className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded flex flex-col gap-4" onClick={(e)=> e.stopPropagation()}>
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Detalhes do chamado</h3>
                        <button className="p-2 px-4 bg-red-500 rounded-md text-white cursor-pointer" onClick={changeVisible}>Fechar</button>
                    </div>

                    <div className="flex flex-col flex-wrap">
                        <div className="flex gap-2 mb-2">
                            <strong>Nome:</strong>
                            <span>{ticket?.name}</span>
                        </div>
                        <strong>Descrição:</strong>
                        <p>{ticket?.description}</p>

                    </div>

                    <div className="w-full bg-slate-200 h-[1px]"></div>

                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Detalhes do cliente</h3>

                        <div className="">
                            <div className="flex gap-2">
                                <strong>Nome:</strong>
                                <span>{ticket?.costumer?.name}</span>
                            </div>

                            <div className="flex gap-2">
                                <strong>Telefone:</strong>
                                <span>{ticket?.costumer?.phone}</span>
                            </div>

                            <div className="flex gap-2">
                                <strong>Email</strong>
                                <span>{ticket?.costumer?.email}</span>
                            </div>

                            {ticket?.costumer?.address && (
                                <div className="flex gap-2">
                                    <strong>Endereço</strong>
                                    <span>{ticket?.costumer?.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}