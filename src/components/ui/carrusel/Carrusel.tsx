"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

interface Marca {
    nombre: string,
    src: string
}

const marcas: Marca[] = [
  { nombre: "Volkswagen", src: "/volkswagen.png" },
  { nombre: "Renault", src: "/renault.png" },
  { nombre: "Ford", src: "/ford.png" },
  { nombre: "Honda", src: "/honda.png" },
  { nombre: "Fiat", src: "/fiat.png" },
];

export const Carrusel = () => {
  return (
    <div className="bg-[#0099ff] py-6 text-center">
      <h2 className="text-white md:text-2xl text-xl mb-4 font-bold md:mx-0 mx-1">TRABAJAMOS CON TODAS LAS MARCAS</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        freeMode={true}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        modules={[Autoplay]}
        className="max-w-4xl mx-auto"
      >
        {marcas.map((marca) => (
          <SwiperSlide key={marca.nombre} className="flex justify-center">
            <div className="relative w-30 h-20 mt-5"> {/* Ajusta el tamaño */}
              <Image
                src={marca.src}
                alt={marca.nombre}
                fill
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
