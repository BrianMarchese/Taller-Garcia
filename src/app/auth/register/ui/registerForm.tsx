"use client"

import { User } from "@/interfaces/user"
import { auth, db, googleProvider } from "@/lib/firebaseConfig"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"

const RegisterForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Creo la funcion para registrar al usuario y guardarlo en la db
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            const userData: User = {
                uid: user.uid,
                email: user.email ?? "",
                isAdmin: false
            }

            await setDoc(doc(db, "users", user.uid), userData)

            router.push("/")
        } catch (error: any) {
            alert(`Hubo un problema al registrarse ${ error }`)
        } finally {
            setLoading(false)
        }
    }

    // Creo la funcion para registrar al usuario en google y guardarlo en la db
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)

            const userDocRef = doc(db, "users", result.user.uid);
            const userSnapshot = await getDoc(userDocRef);

            if (userSnapshot.exists()) {
                await setDoc(userDocRef, {
                email: result.user.email,
                username: result.user.displayName,
                }, { merge: true });
            } else {
                await setDoc(userDocRef, {
                email: result.user.email,
                username: result.user.displayName,
                isAdmin: false,
                });
            }
            router.push("/")
        } catch (error) {
            alert(`Error al iniciar sesión con Google ${ error }`)
        }
    }

    return (
        <form className="flex flex-col" onSubmit={handleRegister}>

            <label htmlFor="email" id="email">Correo electrónico</label>
            <input className = "px-5 py-2 border border-[#0099ffe5] bg-gray-200 rounded mb-5" id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email"/>


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


            <button className="bg-[#0099ffe5] hover:bg-sky-400 w-full p-2 rounded transition-all text-white disabled:opacity-50" type="submit" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            <button type="button" className="w-full mt-5 p-2 rounded bg-[#0099ffe5] hover:bg-sky-400 transition-all text-white flex items-center justify-center" onClick={ handleGoogleLogin }>
                <img
                    src="https://img.icons8.com/color/32/000000/google-logo.png"
                    alt="Logo de Google"
                    className="mr-2 text-xl"
                />
                Registrarse con Google
            </button>


            {/* divisor l ine */ }
            <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
            <div className="px-2 text-gray-800">O</div>
            <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
            href="/auth/login" 
            className="hover:bg-gray-400 w-full p-2 rounded transition-all text-center text-gray-800">
                Ingresar
            </Link>

        </form>
    )
}

export default RegisterForm