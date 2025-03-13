import Link from "next/link"

const RegisterForm = () => {
    return (
        <form className="flex flex-col">

        <label htmlFor="email">Correo electrónico</label>
        <input
        className = "px-5 py-2 border border-[#0099ffe5] bg-gray-200 rounded mb-5"
        type="email"
        />


        <label htmlFor="email">Contraseña</label>
        <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5 border-[#0099ffe5]"
        type="password"
        />

        <button className="bg-[#0099ffe5] hover:bg-sky-400 w-full p-2 rounded transition-all text-white">
            Crear cuenta
        </button>
        <button className="w-full mt-5 p-2 rounded bg-[#0099ffe5] hover:bg-sky-400 transition-all text-white flex items-center justify-center">
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