'use client'

import { auth } from "@/lib/firebaseConfig"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false)

    const [isClient, setIsClient] = useState(false);

    const [user] = useAuthState(auth)

    const router = useRouter();

    useEffect(() => {
        setIsClient(true); // Indica que el componente ya se montó en el cliente
      }, []);

    const toggleMenu = () => {
      setIsOpen(!isOpen)
    }  

    /* CUANDO EL USUARIO HACE CLICK PARA RESERVAR TURNO VERIFICO SI ESTA AUTENTICADO O NO */
    const handleReservationClick = () => {
        if (!user) {
            router.push("/auth/login")
        } else {
            router.push("/turnos")
        }
    }

    const handleLogout = async () => {
        if(!user) {
            router.push("/auth/login")
            return    
        } 

        await signOut(auth);
        window.location.reload()
      };

  return (
    <nav className=" text-white">
        <div className="flex px-5 justify-between items-center w-full fixed z-10 bg-black/55 md:h-14">
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
                <button className="transition-all rounded-md hover:bg-gray-300/50 p-2 " onClick={handleReservationClick}>
                    Reserva tu turno
                </button>
                <div>
                    <button className="transition-all rounded-md hover:bg-gray-300/50 p-2" onClick={handleLogout}>
                        { user ? "Cerrar sesión" : " " }
                    </button>
                </div>
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
                    <button className="transition-all rounded-md hover:bg-gray-300/50 p-2 " onClick={handleReservationClick}>
                        Reserva tu turno
                    </button>
                </li>
                <li>
                    <button type="button" className="transition-all rounded-md hover:bg-gray-300/50 p-2" onClick={handleLogout}>
                        { user ? "Cerrar sesión" : " " }
                    </button>
                </li>
            </ul>
        </div>
    </nav>
  )
}
