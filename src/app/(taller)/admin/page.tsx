'use client'

import { useAdmin } from "@/hooks/useAdmin"
import { db } from "@/lib/firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { Bounce, toast } from "react-toastify";

export default function AdminPage() {
    const { isAdmin, loading } = useAdmin();
    const [turnos, setTurnos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);
    const router = useRouter();
  
    useEffect(() => { // verifico si firebase no esta verificando si es admin y si no es admin lo mando al home
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

    const handleDelete = async (id: string) => {
      const confirmDelete = window.confirm("¿Seguro que quieres eliminar este turno?");
      if (!confirmDelete) return;

      try {
          await deleteDoc(doc(db, "turnos", id));
          setTurnos(turnos.filter((turno) => turno.id !== id));
          toast.success("Turno eliminado correctamente", {
            position: "top-center",
            autoClose: 2000, // El toast se cerrará después de 3 segundos
            hideProgressBar: false, // Ocultar la barra de progreso
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Bounce,
          });
      } catch (error) {
          console.error("Error al eliminar el turno:", error);
      }
  };
  
    if (loading) return <p className="flex flex-col justify-center items-center min-h-screen text-white">Cargando turnos...</p>;
    if (!isAdmin) return null;
  
    return (
      <div className="flex flex-col justify-center items-center min-h-screen overflow-x-auto">
        <div className="md:max-w-5xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-5 text-center text-white">Gestión de Turnos</h1>

            {turnos.length === 0 ? (
                <p className="text-center text-white">No hay turnos registrados.</p>
            ) : (
                <table className="w-full border-collapse rounded-lg border overflow-hidden">
                  <thead>
                    <tr className="bg-[#0099ff] text-white">
                      <th className="p-3 text-left">Nombre</th>
                      <th className="p-3 text-left">Apellido</th>
                      <th className="p-3 text-left">Usuario</th>
                      <th className="p-3 text-left">Fecha</th>
                      <th className="p-3 text-left">Nota</th>
                      <th className="p-3 text-left">Teléfono de contacto</th>
                      <th className="p-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {turnos.map((turno, index) => (
                      <tr
                        key={turno.id}
                        className="bg-gray-200"
                      >
                        <td className="p-3 md:w-28">{turno.nombre}</td>
                        <td className="p-3">{turno.apellido}</td>
                        <td className="p-3">{turno.email || "Desconocido"}</td>
                        <td className="p-3 md:w-28">{turno.fechaReserva}</td>
                        <td className="p-3">{turno.nota}</td>
                        <td className="p-3">{turno.telefono}</td>
                        <td className="p-3">
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            onClick={() => handleDelete(turno.id)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            )}
        </div>
      </div>
    )
}