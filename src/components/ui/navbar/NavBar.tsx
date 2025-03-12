'use client'


import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
      setIsOpen(!isOpen)
    }  

  return (
    <nav className=" text-white">
        <div className="flex px-5 justify-between items-center w-full fixed z-10 bg-black/55">
            <ul className="hidden md:flex">
                <li >
                    <Link href="/">
                        <span className="antialiased font-bold text-xl">Taller García Hnos</span>
                    </Link>
                </li>
            </ul>
            <ul className="hidden md:flex">
                <li>
                    <Link  className="m-2 p-2 rounded-md transition-all hover:bg-gray-300/50" href="#nosotros">Nosotros</Link>
                </li>
                <li>
                    <Link  className="m-2 p-2 rounded-md transition-all hover:bg-gray-300/50" href="#contacto">Contacto</Link>
                </li>

            </ul>
            <div className="hidden md:flex md:items-center">
                <Link href="/turno">
                    <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-300/50">
                        Reserva tu turno
                    </button>
                </Link>
            </div>

            {/* Menú hamburguesa para móviles */}
            <span className="md:hidden antialiased font-bold text-xl flex items-center justify-center">Taller García Hnos</span>
            <div className="md:hidden text-white py-5">
                <button onClick={toggleMenu} className="flex items-center justify-center">
                    {isOpen ?  "" : <FiMenu className="w-6 h-6" />}
                </button>
            </div>
        </div>

        {/* Menú móvil desplegable */}
        <div className={`fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center transition-transform duration-300 ${ isOpen ? "translate-x-0" : "-translate-x-full" }`}>
            
            <button className="absolute top-5 right-5 text-white" onClick={toggleMenu}>
                <FiX className="w-8 h-8" />
            </button>


            <ul className="text-white text-xl space-y-6">
                <li>
                    <Link href="/nosotros" onClick={toggleMenu} className="rounded-md p-2 hover:bg-gray-300/50 transition-all">
                        Nosotros
                    </Link>
                </li>
                <li>
                    <Link href="/servicios" onClick={toggleMenu} className="rounded-md p-2 hover:bg-gray-300/50 transition-all">
                        Servicios
                    </Link>
                </li>
                <li>
                    <Link href="/turno" onClick={toggleMenu}>
                        <button className="transition-all rounded-md hover:bg-gray-300/50 p-2 ">
                            Reserva tu turno
                        </button>
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}
