"use client"

import { auth, googleProvider } from "@/lib/firebaseConfig"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"


const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    // Creo la funcion para iniciar sesion
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password)
            router.push("/")
        } catch (error) {
            alert(`Error al iniciar sesión ${ error }`)
        }
    }

    // Creo la funcion para iniciar sesion con google
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            router.push("/")
        } catch (error) {
            alert(`Error al iniciar sesión con Google ${ error }`)
        }
    }

    return (
        <form className="flex flex-col" onSubmit={handleLogin}>
            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5 border-[#0099ffe5] focus:outline-none focus:ring-1 focus:ring-[#0099ff]"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />


            <label htmlFor="password" className="block">Contraseña</label>
            <div className="relative">

                <input
                    className="px-5 py-2 border bg-gray-200 rounded mb-5 border-[#0099ffe5] focus:outline-none focus:ring-1 focus:ring-[#0099ff] w-full"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <button
                    type="button"
                    className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}>
                        
                    {showPassword ? <HiEyeOff size={20} className="text-[#0099ffe5]"/> : <HiEye size={20} className="text-[#0099ffe5]" />}
                </button>
            </div>

            <button type="submit" className="bg-[#0099ffe5] hover:bg-sky-400 w-full p-2 rounded transition-all text-white"  disabled={loading}>
                {loading ? "Iniciando sesión..." : "Ingresar"}
            </button>
            <button type="button" onClick={ handleGoogleLogin } className="w-full mt-5 p-2 rounded bg-[#0099ffe5] hover:bg-sky-400 transition-all text-white flex items-center justify-center">
                <img
                    src="https://img.icons8.com/color/32/000000/google-logo.png"
                    alt="Logo de Google"
                    className="mr-2 text-xl"
                />
                Ingresar con Google
            </button>

            {/* divisor l ine */ }
            <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
            href="/auth/register" 
            className="text-center hover:bg-gray-400 p-2 rounded transition-all text-gray-800">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}


export default LoginForm