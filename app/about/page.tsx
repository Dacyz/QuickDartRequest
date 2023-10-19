/* eslint-disable @next/next/no-img-element */
// Página de inicio en Next.js (pages/index.tsx)
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SocialIcon } from "react-social-icons";

const listCards: Card[] = [
  {
    title: "Consulta de Peticiones",
    description:
      "Capacidad de consultar peticiones con una configuración fácil de encabezados, parámetros y métodos de consulta en cada solicitud según sus necesidades específicas.",
  },
  {
    title: "Gestión de Peticiones",
    description:
      "Seguimiento de su historial detallado de consultas y simplificación en la repetición de acciones al brindar a nuestros usuarios un acceso rápido a sus solicitudes anteriores.",
  },
  {
    title: "Generación de Modelos",
    description:
      "Generación de modelos de Dart a partir de la respuesta de una petición. Útil especialmente para desarrolladores, ya que les permite transformar datos en estructuras de modelo de Dart con facilidad.",
  },
  {
    title: "Personalización Avanzada",
    description:
      "Capacidad de ajustar y modificar los modelos de Dart generados según sus necesidades específicas, lo que agrega un nivel de flexibilidad imprescindible.",
  },
  {
    title: "Trabajo Colaborativo",
    description:
      "Permite a los usuarios exportar e importar datos en diversos formatos, lo que simplifica la colaboración entre equipos y el intercambio de configuraciones y proyectos. La versatilidad de formatos de exportación facilita la integración en diferentes flujos de trabajo.",
  },
  {
    title: "Acceso Rápido",
    description:
      "Ofrece atajos que permiten a los usuarios acelerar su flujo de trabajo. Estos atajos optimizan la experiencia del usuario, brindando un acceso rápido a las funciones clave y mejorando su productividad general.",
  },
];

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Home */}
      <section className="container mx-auto flex flex-col py-6 h-screen px-4 md:px-0">
        <div className="flex flex-col flex-grow items-center justify-center text-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100pt"
            height="100pt"
            version="1.1"
            viewBox="0 0 100 100"
            fill="white"
          >
            <g>
              <path
                fill="#0075C9"
                d="m46.766 87.262c-4.8164-7.3789-2.7305-17.27 4.6562-22.094 4.4727-3.0781 6.9648-6.8867 8.3867-11.863 1.2852-4.4922 1.4375-9.0469 0.62891-13.344-4.2969-0.80859-8.8516-0.65625-13.344 0.62891-4.9766 1.4219-8.7852 3.9141-11.863 8.3867-4.8242 7.3906-14.715 9.4727-22.094 4.6562-4.0195-2.6211-6.4648-6.7812-7.082-11.199-1.9805 10.934 0.050781 22.617 6.6055 32.656 1.6758 2.5664 3.5703 4.9023 5.6367 7.0078 2.1055 2.0703 4.4414 3.9609 7.0078 5.6367 10.039 6.5547 21.723 8.5859 32.656 6.6055-4.4102-0.60938-8.5703-3.0586-11.195-7.0781z"
              />
              <path
                fill="#22D3C5"
                d="m13.25 49.895c6.0352 3.9414 14.254 0.39844 19.664-6.2461 2.0938-2.5703 11.953-11.602 25.488-10.164-3.0938-6.8477-8.8633-12.406-16.469-14.977-12.391-4.1836-25.398 1.2227-31.805 12.199-0.25391 0.53125-0.49609 1.0664-0.72656 1.6055-2.8555 6.7148-1.3867 14.164 3.8477 17.582z"
              />
              <path
                fill="#22D3C5"
                d="m81.891 58.473c-2.5703-7.6055-8.125-13.375-14.977-16.469 1.4375 13.535-7.5898 23.395-10.164 25.488-6.6445 5.4062-10.184 13.625-6.2461 19.664 3.4141 5.2344 10.867 6.7031 17.578 3.8477 0.53906-0.23047 1.0742-0.47266 1.6055-0.72656 10.98-6.4062 16.387-19.418 12.203-31.805z"
              />
              <path
                fill="#00A8E1"
                d="m88.141 24.91c-1.6758-2.5664-3.5664-4.9062-5.6367-7.0078-2.1055-2.0703-4.4414-3.9609-7.0078-5.6367-19.758-12.898-45.875-8.2969-60.129 9.9648 14.09-12.727 37.543-11.203 47.992 8.5117 0.78516 1.4766 1.4258 2.9297 1.9414 4.3555 1.4258 0.51562 2.8789 1.1602 4.3555 1.9414 19.715 10.453 21.238 33.902 8.5117 47.992 18.266-14.25 22.867-40.367 9.9727-60.121z"
              />
            </g>
          </svg>
          <h1 className="text-4xl font-bold">QuickDartRequest</h1>
          <p className="mt-4 text-xl">
            Simplifica las peticiones HTTP de tu código Dart en 3 pasos.
          </p>
          <div className="grid gap-3 justify-center align-middle mx-auto md:grid-flow-col pt-6">
            <Link href="#caracteristicas">
              <button className="heroOutlinedButton rounded-[16px] md:rounded-r-2xl">
                Conocer más
              </button>
            </Link>
            <Link href="start">
              <button className="heroFilledButton rounded-[16px] md:rounded-r-2xl">
                Convertir ahora
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between">
          {/* Social Icons */}
          <div className="flex flex-row gap-2 items-center">
            <SocialIcon
              url="https://twitter.com/DacyNoob"
              target="_blank"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
            <SocialIcon
              url="https://www.linkedin.com/in/diegoyanguam/"
              target="_blank"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
            <SocialIcon
              url="https://github.com/Dacyz"
              target="_blank"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <SocialIcon
              url="https://www.youtube.com/channel/UCGJwZBiP5TyP5tTP0wlFnMQ"
              target="_blank"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
            <SocialIcon
              url="https://www.twitch.tv/dacynoob"
              target="_blank"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
            <SocialIcon
              url="https://www.instagram.com/diegoartcy/"
              target="_blank"
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>
      {/* Leading */}
      <section className="py-16 mx-4 md:mx-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold">
                Generación de Modelos de Datos
              </h2>
              <p className="mt-4 text-xl">
                Convierte datos JSON en modelos de Dart utilizando TypeScript.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/convertion.webp"
                alt="Generación de Modelos de Datos"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Características principales */}
      <section className="bg-gray-800 flex py-16" id="caracteristicas">
        <div className="container mx-auto text-center flex flex-col justify-center items-center bg-center">
          <h2 className="text-3xl font-semibold text-white mx-4 md:mx-0">
            Características Principales
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 mx-4 md:mx-0">
            {listCards.map((card, i) => {
              return (
                <>
                  <CardProp title={card.title} description={card.description} />
                </>
              );
            })}
          </div>
          <h2 className="text-3xl mt-8 font-semibold text-white mx-4 md:mx-0">
            Principales modos
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 mx-4 md:mx-0">
            {[
              {
                title: "Http Request",
                description: "Permite la conversión desde una petición en cualquier método a modelo de datos Dart",
                imageUrl: "images/api.webp",
                probar: true,
              },
              {
                title: "Convert Request",
                description: "Permite la conversión de objetos JSON a modelo de datos Dart",
                imageUrl: "images/json.webp",
                probar: true,
              },
              {
                title: "Socket Request",
                description: "Próximamente...",
                imageUrl: "images/socket.webp",
              },
            ].map((card, i) => {
              return (
                <>
                  <CardProp
                    title={card.title}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    probar={card.probar}
                  />
                </>
              );
            })}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-6 text-center">
        <p>&copy; 2023 Tu Aplicación Web. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

interface Card {
  title: string;
  description?: string;
  imageUrl?: string;
  probar?: boolean;
}

const CardProp: React.FC<Card> = ({ title, description, imageUrl, probar }) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-gray-900 items-center justify-center gap-2 flex flex-col transition-all opacity-90 border border-gray-700 hover:border-gray-400 hover:opacity-100">
      {typeof imageUrl !== "undefined" && imageUrl !== "" ? (
        <img src={imageUrl} alt={title} />
      ) : (
        <></>
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
      {typeof description !== "undefined" && description !== "" ? (
        <p>{description}</p>
      ) : (
        <></>
      )}
      {typeof probar !== "undefined" && probar !== false ? (
        <Link href="start">
          <button className="heroOutlinedButton rounded-[16px] md:rounded-r-2xl">
            Probar {title}
          </button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LandingPage;
