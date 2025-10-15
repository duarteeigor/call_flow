"use client"

import {
    Menu,
    ClipboardMinus,
    ChartNoAxesColumnIncreasing,
    User,
    CircleUserRound,
    LogOut,
} from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function Sidebar({ path }: { path: string }) {
    const [isMobile, setIsMobile] = useState(true)
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const textFormated =
        path.replace("/", "").charAt(0).toUpperCase() + path.replace("/", "").slice(1)

    const items = [
        { label: "Dashboard", href: "/dashboard", icon: <User size={22} /> },
        { label: "Clients", href: "/clients", icon: <ClipboardMinus size={22} /> },
        { label: "Report", href: "/report", icon: <ChartNoAxesColumnIncreasing size={22} /> },
    ]

    // Detecta mobile
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    async function handleLogout(){
        await signOut({redirect: false})
        router.replace("/")
    }

    return (
        <>
            {/* BOTÃO MOBILE */}
            {isMobile && (
                <button
                    className="fixed top-4 left-4 bg-white shadow-md rounded-md p-2 z-50"
                    onClick={() => setOpen(!open)}
                >
                    <Menu color="#000" size={24} />
                </button>
            )}

            {/* OVERLAY MOBILE */}
            {isMobile && open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* SIDEBAR */}
            <div
                className={`fixed top-0 left-0 h-screen bg-[#F8F9FA] border-r border-gray-200 flex flex-col items-start px-2 py-5
        transition-all duration-500 ease-in-out z-50
        ${isMobile ? (open ? "translate-x-0 w-64" : "-translate-x-full w-64") : open ? "w-64" : "w-16"}
        `}
                onMouseEnter={() => !isMobile && setOpen(true)}
                onMouseLeave={() => !isMobile && setOpen(false)}
            >
                {/* TOP-SIDEBAR */}
                <div className="flex items-center gap-3 mb-8 px-1 w-full">
                    <CircleUserRound color="#1E254A" size={35} />
                    <div
                        className={`overflow-hidden transition-all duration-500 ${open ? "w-40 ml-2" : "w-0"
                            }`}
                    >
                        <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                            {textFormated}
                        </h2>
                    </div>
                </div>

                {/* MENU */}
                <nav className="flex flex-col gap-2 w-full">
                    {items.map((item) => {
                        const isActive = path === item.href
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 p-2 rounded-md transition-colors duration-300 cursor-pointer ${isActive
                                        ? "bg-[#6F78F5] text-white"
                                        : "text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-500 ${open ? "w-32 ml-2" : "w-0"
                                        }`}
                                >
                                    <span className="whitespace-nowrap">{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </nav>

                {/* BOTÃO Sair */}
                <button
                    className="mt-auto mb-6 flex items-center gap-2 px-2 cursor-pointer"
                    onClick={handleLogout}>
                    <LogOut size={22} color="red" />
                    <div
                        className={`overflow-hidden transition-all duration-500 ${open ? "w-10 " : "w-0"
                            }`}
                    >
                        <span className="text-red-600 whitespace-nowrap">Sair</span>
                    </div>

                </button>
            </div>
        </>
    )
}
