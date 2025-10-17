"use client"
import { Modal } from "@/components/modal/Modal";
import { TicketProps } from "@/utils/types/ticket";
import { createContext, useState } from "react";


interface ModalContextProps{
    visible: boolean
    changeVisible: ()=> void;
    getTicket: (data: TicketProps) =>void;
    ticket: TicketProps | undefined
}

export const ModalContext = createContext({} as ModalContextProps)

export const ModalProvider = ({children}: {children: React.ReactNode})=>{
    const [visible, setVisible] = useState(false)
    const [ticket, setTicket] = useState<TicketProps | undefined>()

    function changeVisible(){
        setVisible(!visible)
    }

    function getTicket(data: TicketProps){
        setTicket(data)
    }

    return(
        <ModalContext.Provider value={{visible, changeVisible, getTicket, ticket}}>
            {visible && <Modal />}
            {children}
        </ModalContext.Provider>
    )
}