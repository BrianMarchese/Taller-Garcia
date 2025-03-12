"use client"

import { Carrusel } from "@/components";
import Image from "next/image";
import { BsTelephone } from "react-icons/bs";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { TfiMapAlt } from "react-icons/tfi";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div>
      {/* Imagen de fondo */}
      <div className="relative w-full h-[95vh]">
        <Image 
          src="/taller.jpg" 
          alt="Taller Mecánico"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />

        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1420 291">
            <path fill="#0099ff" fillOpacity="0.9" d="M0,288L48,288C96,288,192,288,288,261.3C384,235,480,181,576,149.3C672,117,768,107,864,101.3C960,96,1056,96,1152,85.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Texto sobre la imagen */}
      <motion.div initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }} whileInView={{ opacity: 1, x: 0 }} className="absolute inset-0 flex items-center justify-center text-white md:text-4xl text-2xl font-bold md:ml-0 text-center">
        ¡Bienvenido a nuestro taller Garcia Hnos!
      </motion.div>

      {/* SVG */}

      <div className="text-center py-20 px-5 font-bold bg-gray-600 text-white" id="nosotros">
        <h2 className="md:text-4xl text-2xl text-center ">Nos especializamos en mecánica general</h2>
      </div>
      
      <motion.div initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }} whileInView={{ opacity: 1, x: 0 }}  className="p-8 flex justify-center items-center">
      {/* Card con imagen a la derecha y texto a la izquierda */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row md:grid md:grid-cols-2 gap-8 mb-1 border border-white rounded-lg p-6">
          {/* Sección de texto (a la izquierda) */}
          <div className="rounded-lg">
            <h2 className="text-3xl text-white mb-4 font-bold">| Quienes Somos</h2>
            <p className="text-white text-lg font-normal mb-4 ">Somos un taller mecánico fundado en el año 1990, reconocido en la localidad de Rosario. Pregunte por nuestros servicios en todo lo relacionado con mecánica en general.</p>
            <p className="text-white text-lg font-normal ">Nuestros especialistas en mecánica lo atenderán con responsabilidad, seriedad, calidad y compromiso.</p>
          </div>

          {/* Sección de imagen (a la derecha) */}
          <div className="relative rounded-lg overflow-hidden w-full h-64 md:h-auto  ">
            {/* Imagen */}
            <Image src="/profesionales.jpeg" alt="image11"className="object-cover rounded-lg sm:ml-10 lg:ml-36"  width={1100} height={100}  style={{width: '400px',height: '250px'}} />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5 }} whileInView={{ opacity: 1, x: 0 }} className="p-8 flex justify-center items-center">
        {/* Primer contenedor */}
        <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row md:grid md:grid-cols-2 mb-1 border border-white rounded-lg p-6">
          {/* Sección de imagen (aparece abajo en móviles) */}
          <div className="relative rounded-lg overflow-hidden w-full h-64 md:h-auto mt-8 md:mt-0">
            {/* Imagen */}
            <Image src="/empleados.jpg" alt="image11" className="object-cover rounded-lg"  width={1100} height={100}  style={{width: '400px',height: '250px'}}/>
          </div>

          {/* Sección de texto (aparece arriba en móviles) */}
          <div className="rounded-lg 2xl:-ml-24">
            <h2 className="text-3xl text-white mb-6 font-bold">| Profesionales a su servicio</h2>
            <p className="text-white text-lg font-normal mb-6">Estamos especializados en el rubro de la mecánica en general. Además, disponemos de las herramientas adecuadas y de los recursos necesarios para desarrollar nuestro trabajo.</p>
            <p className="text-white text-lg font-normal">Visítenos ahora mismo, en nuestro taller mecánico tenemos un gran personal encargado de dar la mejor atención a los clientes en la provincia de Santa Fe.</p>
          </div>
        </div>
      </motion.div>

      {/* CARRUSEL */}
      <Carrusel />

      <div className="text-center py-16 px-5 font-bold bg-gray-600 text-white" id="contacto">
        <h2 className="md:text-4xl text-2xl text-center ">Donde nos encontras</h2>
        <div className="grid md:grid-cols-3 grid-cols-1 md:mt-20 mt-10 gap-7 md:gap-0">
          <div className="flex flex-col items-center justify-center">
            <TfiMapAlt className="mb-3" size={30}/>
            <h3 className="font-bold">Dirección</h3>
            <span className="font-normal">Mendoza 1254</span>
            <span className="font-normal">Rosario SANTA FE (2000)</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <BsTelephone className="mb-3" size={30}/>
            <h3 className="font-bold">Teléfono</h3>
            <span className="font-normal">​(0341) 456 0000</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <IoPhonePortraitOutline className="mb-3" size={30}/>
            <h3 className="font-bold">Móvil</h3>
            <span className="font-normal">341 123 4567</span>
          </div>
        </div>
      </div>
      
      {/* MAPA */}
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107134.7530392065!2d-60.779039975965546!3d-32.952038204379804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6539335d7d75b%3A0xec4086e90258a557!2sRosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1741712970042!5m2!1ses!2sar" width="100%" height="350" frameBorder="0"  data-gtm-yt-inspected-8="true"></iframe>
    </div>
  );
}
