import Link from "next/link"


export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-sm mt-10 pb-10 text-white">
        <Link href="/">
            <span className=' antialiased font-bold'>García Hnos </span>
            <span>© { new Date().getFullYear() }</span>
        </Link>
        <Link href="/" className="mx-3 hover:underline">
            Privacidad & Legales
        </Link>
    </div>
  )
}
