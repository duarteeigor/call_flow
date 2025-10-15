"use client"
import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
    label: string
    type: string
    placeholder: string
    name: string
    regiser: UseFormRegister<any>
    error?: string
    rules?: RegisterOptions
}

export function Input({ type, placeholder, regiser, name, error, rules, label }: InputProps) {
    return (
        <>
            <label className={error ? "text-red-500" : "text-black"}>{label}</label>
            <input
                className={`w-full p-3 border-2 rounded-md outline-none ${error ? "border-red-500" : "border-slate-100"}`}
                type={type}
                placeholder={placeholder}
                {...regiser(name, rules)}
                name={name}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </>
    )
}