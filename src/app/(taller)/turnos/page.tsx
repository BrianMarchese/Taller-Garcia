'use client'

import { Turnos } from "@/interfaces/turnos"
import { auth, db } from "@/lib/firebaseConfig"
import { addDoc, collection, FieldValue, getDocs, query, serverTimestamp, where } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Bounce, toast } from "react-toastify"

export default function TurnosPage() {

    const [fechaReserva, setFechaReserva] = useState("")
    const [horaReserva, setHoraReserva] = useState("");
    const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [nota, setNota] = useState("")
    const [telefono, setTelefono] = useState("")
    const router = useRouter();
  
    const horarios = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

    const fetchHorasDisponibles = async (fecha: string) => { // Cada vez que el usuario elige una fecha, se busca en Firestore cuáles horarios ya están ocupados para esa fecha y se actualiza la lista de horasDisponibles
      const turnosRef = collection(db, "turnos");
      const queryy = query(turnosRef, where("fechaReserva", "==", fecha));
      const snapshot = await getDocs(queryy);
    
      const horasReservadas = snapshot.docs.map(doc => doc.data().horaReserva);
      const horasLibres = horarios.filter(hora => !horasReservadas.includes(hora));
      setHorasDisponibles(horasLibres);
    };
    
    useEffect(() => { // Cada vez que cambia fechaReserva, se ejecuta la función para buscar horarios disponibles.
      if (fechaReserva) {
        fetchHorasDisponibles(fechaReserva);
      }
    }, [fechaReserva]);

    const handleSubmit = async ( e: React.FormEvent ) => {
      e.preventDefault()

      if (!auth.currentUser) {
        router.replace("/auth/login");
        return
      }

      try {
        const nuevoTurno: Turnos = {
          nombre,
          apellido,
          email: auth.currentUser.email,
          fechaReserva,
          horaReserva,
          nota,
          telefono,
          createdAt: serverTimestamp() as FieldValue,
        }

        await addDoc(collection(db, "turnos"), nuevoTurno)
        toast.success("Turno registrado correctamente", {
          position: "top-center",
          autoClose: 3000, // El toast se cerrará después de 3 segundos
          hideProgressBar: false, // Ocultar la barra de progreso
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });

        setNombre("")
        setApellido("")
        setFechaReserva("")
        setNota("")
        setTelefono("")
        router.replace("/")
      } catch (error) {
        toast.error(`Error al registrar el turno ${ error }`, {
          position: "top-center",
          autoClose: 3000, // El toast se cerrará después de 3 segundos
          hideProgressBar: false, // Ocultar la barra de progreso
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
      }
    }
    
    
    return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full sm:w-[450px] bg-gray-600 text-gray-300 shadow-lg rounded-2xl p-6 md:mt-28 mt-20 ">
        <h2 className="text-2xl font-bold text-center mb-6">Reserva tu turno</h2>

        <form onSubmit={ handleSubmit } className="space-y-4">

          <div>
            <label htmlFor="nombre" className="block font-medium mb-1">Nombre</label>
            <input type="text"
              value={ nombre }
              onChange={ (e) => setNombre(e.target.value) }
              id="nombre" 
              className="w-full p-2 rounded-lg border border-gray-600 text-black resize-none focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
              required
            />
          </div>

          <div>
            <label htmlFor="nombre" className="block font-medium mb-1">Apellido</label>
            <input type="text"
              value={ apellido }
              onChange={ (e) => setApellido(e.target.value) }
              id="apellido" 
              className="w-full p-2 rounded-lg border border-gray-600 text-black resize-none focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
              required
            />
          </div>

          <div>
            <label htmlFor="data" className="block font-medium mb-1">Fecha</label>
            <input 
              type="date" 
              id="data" 
              value={ fechaReserva }
              onChange={ (e) => setFechaReserva(e.target.value) }
              className="w-full p-2 rounded-lg  border border-gray-600 text-black focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Hora</label>
            <div className="grid grid-cols-3 gap-2">
                {horasDisponibles.map((hora) => (
                    <button
                      type="button"
                      key={hora}
                      onClick={() => setHoraReserva(hora)}
                      className={`p-2 rounded-lg border border-gray-600 text-white transition-all ${
                      horaReserva === hora ? "bg-[#0099ff] text-white" : "bg-gray-500"}`}>
                      {hora}
                    </button>))}
              </div>
          </div>


          <div>
            <label htmlFor="celular" className="block font-medium mb-1">Celular</label>
            <input type="tel"
              value={ telefono }
              onChange={ (e) => setTelefono(e.target.value) }
              id="celular" 
              placeholder="Celular de contacto" 
              className="w-full p-2 rounded-lg border border-gray-600 text-black resize-none focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
              required
            />
          </div>

          <div>
            <label htmlFor="nota" className="block font-medium mb-1">Nota</label>
            <textarea 
              value={ nota }
              onChange={ (e) => setNota(e.target.value) }
              id="nota" 
              placeholder="Escribí una nota..." 
              className="w-full p-2 rounded-lg border border-gray-600 text-black resize-none h-32 focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
            />
          </div>


          <button 
            type="submit" 
            className="w-full bg-[#0099ff] hover:bg-[#0088e6] transition-all text-white font-semibold p-2 rounded-lg"
          >
            Reservar
          </button>
        </form>
      </div>
    </div>
    )
}