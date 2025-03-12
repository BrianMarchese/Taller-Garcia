import { FaWhatsapp } from "react-icons/fa";

export const FloatButtonWhatsapp = () => {
    return (
      <a
        href="https://wa.me/54934100000000" // Enlace para iniciar un chat de WhatsApp
        target="_blank" // Abre en una nueva pestaña
        rel="noopener noreferrer" // Mejora la seguridad al abrir enlaces externos
        className="fixed bottom-5 right-5 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors z-20" // Estilos para el botón
      >
        <FaWhatsapp size={36} className='text-white' /> {/* Icono de WhatsApp */}
      </a>
    );
  };