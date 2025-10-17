"use client"
import { Lock, User, LogOut, LoaderCircle, } from "lucide-react"


import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar } from "../sidebar"


export function Header() {
    const { data, status } = useSession()
    const path = usePathname()

    const isHome = path === "/"



    return (
        <header className={`w-full h-20 flex items-center ${isHome && "bg-transparent fixed"}  `}>
            <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-4">

                {isHome ? (
                    <>
                        <Link href={"/"}>
                            <h1 className={`text-4xl ${isHome ? "text-white" : "text-black"} font-semibold  hover:tracking-widest duration-200`}><span className="text-[#1A2B42]">Call</span>Flow</h1>
                        </Link>

                        {status === "loading" && (
                            <button className="animate-spin">
                                <LoaderCircle color={isHome ? "#fff" : "#000"} size={24} />
                            </button>
                        )}

                        {status === "unauthenticated" && (
                            <button className="hover:scale-125 duration-200 cursor-pointer">
                                <Lock color={isHome ? "#fff" : "#000"} size={24} onClick={() => signIn("google", { redirectTo: "/dashboard" })} />
                            </button>
                        )}

                        {status === "authenticated" && (
                            <div className="flex gap-6 items-center">
                                <button className="hover:scale-125 duration-200 cursor-pointer">
                                    <Link href={"/dashboard"}><User color={isHome ? "#fff" : "#000"} size={24} /></Link>
                                </button>

                                <button className="hover:scale-125 duration-200 cursor-pointer">
                                    <LogOut color={isHome ? "#fff" : "#000"} size={24} onClick={() => signOut()} />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <Sidebar path={path} />
                )}






            </div>
        </header>
    )
}

