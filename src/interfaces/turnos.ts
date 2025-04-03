import { FieldValue } from "firebase/firestore";

export interface Turnos {
    nombre: string,
    apellido: string,
    email: string | null,
    fechaReserva: string,
    horaReserva: string,
    nota: string,
    telefono: string,
    createdAt: FieldValue
}