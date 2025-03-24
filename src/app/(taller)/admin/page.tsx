'use client'

import { useAdmin } from "@/hooks/useAdmin"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function AdminPage() {
    const { isAdmin, loading } = useAdmin();
    const router = useRouter();
  
    useEffect(() => {
      if (!loading && !isAdmin) {
        router.replace("/");
      }
    }, [isAdmin, loading, router]);
  
    if (loading) return <p className="flex flex-col justify-center items-center min-h-screen">Cargando...</p>;
    if (!isAdmin) return null;
  
    return (
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <h1>ESTA ES LA PAGINA DEL ADMIN</h1>
      </div>
    )
}