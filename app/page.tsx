/* eslint-disable @next/next/no-img-element */
// Página de inicio en Next.js (pages/index.tsx)
import LogoIcon from "@/utils/icons/logo";
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
          <LogoIcon size="large" />
          <h1 className="text-4xl font-bold">QuickDartRequest</h1>
          <p className="mt-4 text-xl">
            Simplifica las peticiones HTTP de tu código Dart en 3 pasos.
          </p>
          <div className="grid gap-3 justify-center align-middle mx-auto md:grid-flow-col pt-6">
            <Link href="docs">
              <button className="heroOutlinedButton rounded-[16px] md:rounded-r-2xl">
                Documentación
              </button>
            </Link>
            <Link href="start">
              <button className="heroFilledButton rounded-[16px] md:rounded-r-2xl">
                Iniciar
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
                description:
                  "Permite la conversión desde una petición en cualquier método a modelo de datos Dart",
                imageUrl: "images/api.webp",
                probar: true,
              },
              {
                title: "Convert Request",
                description:
                  "Permite la conversión de objetos JSON a modelo de datos Dart",
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
        <p>
          &copy; 2023 <Link href={"/docs"}>Quick Dart Request.</Link>
          Todos los derechos reservados.
        </p>
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
