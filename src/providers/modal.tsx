"use client"
import { Modal } from "@/components/modal/Modal";
import { createContext, useState } from "react";


interface ModalContextProps{
    visible: boolean
    changeVisible: ()=> void;
}

const ModalContext = createContext({} as ModalContextProps)

export const ModalProvider = ({children}: {children: React.ReactNode})=>{
    const [visible, setVisible] = useState(true)

    function changeVisible(){
        setVisible(!visible)
    }

    return(
        <ModalContext.Provider value={{visible, changeVisible}}>
            {visible && <Modal />}
            {children}
        </ModalContext.Provider>
    )
}