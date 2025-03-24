"use client"

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export const useAdmin = () => {
  // Obtenemos el usuario y el estado de carga del hook de Firebase Auth
  const [user, authLoading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  // Usamos "loading" para el proceso de consulta a Firestore
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mientras la autenticación aún carga, no hacemos nada
    if (authLoading) return;

    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          console.log("Datos del usuario obtenidos:", userData);
          setIsAdmin(!!userData.isAdmin); // Aseguramos que sea booleano
        } else {
          console.log("No se encontró documento para el usuario");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAdmin();
  }, [user, authLoading]);

  // Combinamos ambos estados de carga
  return { isAdmin, loading: loading || authLoading };
};
