/* eslint-disable @next/next/no-img-element */
// Página de inicio en Next.js (pages/index.tsx)
import React from "react";
import Navbar from "./components/navbar";
import ChapterViewer from "./components/documentation";

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <div className="h-20" />
      {/* Leading */}
      <section className="container relative mx-auto">
        <ChapterViewer />
      </section>
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
      {/* Footer */}
      <footer className="py-6 text-center">
        <p>&copy; 2023 Quick Dart Request. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
