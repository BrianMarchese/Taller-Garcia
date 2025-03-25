'use client'

import { useAdmin } from "@/hooks/useAdmin"
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function AdminPage() {
    const { isAdmin, loading } = useAdmin();
    const [turnos, setTurnos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);
    const router = useRouter();
  
    useEffect(() => {
      if (!loading && !isAdmin) {
        router.replace("/");
      }
    }, [isAdmin, loading, router]);

    useEffect(() => {
      const fetchTurnos = async () => {
          setCargando(true);
          try {
              const querySnapshot = await getDocs(collection(db, "turnos"));
              const turnosData = querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
              }));
              setTurnos(turnosData);
          } catch (error) {
              console.error("Error obteniendo los turnos:", error);
          } finally {
              setCargando(false);
          }
      };

      fetchTurnos();
    }, []);
  
    if (loading) return <p className="flex flex-col justify-center items-center min-h-screen text-white">Cargando turnos...</p>;
    if (!isAdmin) return null;
  
    return (
      <div className="flex flex-col justify-center items-center min-h-screen overflow-x-auto">
        <div className="md:max-w-5xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-5 text-center text-white">Gestión de Turnos</h1>

            {turnos.length === 0 ? (
                <p className="text-center text-white">No hay turnos registrados.</p>
            ) : (
                <table className="w-full border-collapse rounded-lg shadow-md overflow-hidden">
                  <thead>
                    <tr className="bg-[#0099ff] text-white">
                      <th className="p-3 text-left">Nombre</th>
                      <th className="p-3 text-left">Apellido</th>
                      <th className="p-3 text-left">Usuario</th>
                      <th className="p-3 text-left">Fecha</th>
                      <th className="p-3 text-left">Nota</th>
                      <th className="p-3 text-left">Teléfono de contacto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turnos.map((turno, index) => (
                      <tr
                        key={turno.id}
                        className="bg-gray-200"
                      >
                        <td className="p-3">{turno.nombre}</td>
                        <td className="p-3">{turno.apellido}</td>
                        <td className="p-3">{turno.email || "Desconocido"}</td>
                        <td className="p-3">{turno.fechaReserva}</td>
                        <td className="p-3">{turno.nota}</td>
                        <td className="p-3">{turno.telefono}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            )}
        </div>
      </div>
    )
}