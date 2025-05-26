'use client'

import { db, auth } from "@/lib/firebaseConfig"
import { collection, getDocs, query, where } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Turnos } from "@/interfaces/turnos"


export default function MisTurnosPage() {
  const [turnos, setTurnos] = useState<Turnos[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fechaFormat = (fecha: string) => {
    const [anio, mes, dia] = fecha.split("-");
    return `${dia}-${mes}-${anio}`;
  }

  useEffect(() => {
     onAuthStateChanged(auth, async (user) => {
        if (!user) {
        router.replace("/auth/login");
        return;
        }

        try {
        const q = query(
            collection(db, "turnos"),
            where("email", "==", user.email)
        );
        const snapshot = await getDocs(q);
        
        const turnosData: Turnos[] = snapshot.docs.map((doc) =>
            doc.data() as Turnos
        );

        setTurnos(turnosData);
        } catch (error) {
        console.error("Error cargando turnos del usuario:", error);
        } finally {
        setLoading(false);
        }
    });
}, [router]);

  if (loading) return <p className="flex flex-col justify-center items-center min-h-screen text-lg text-white">Cargando tus turnos...</p>

  return (
    <div className="flex flex-col justify-center items-center min-h-screen overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">Mis Turnos</h1>

      {turnos.length === 0 ? (
        <p className="text-center text-white">No tenés turnos agendados aun.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#0099ff] text-white">
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Hora</th>
                <th className="p-3 text-left">Nota</th>
                <th className="p-3 text-left">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {turnos.map((turno) => (
                <tr key={turno.email} className="border-b border-gray-600">
                  <td className="p-3 border-r border-gray-400">{fechaFormat(turno.fechaReserva)}</td>
                  <td className="p-3 border-r border-gray-400">{turno.horaReserva}</td>
                  <td className="p-3 border-r border-gray-400">{turno.nota}</td>
                  <td className="p-3 border-r border-gray-400">{turno.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
