"use client";
// components/ChapterViewer.tsx
import React, { useEffect, useState } from "react";

type Title = string;
type Content = React.ReactNode | Map<Title, Content>;

const chapterContent: Map<Title, Content> = new Map<Title, Content>([
  [
    "Preparativos",
    new Map<Title, Content>([
      [
        "Iniciemos",
        <>
          <p>
            Bienvenido a nuestra innovadora aplicación web de generación y
            gestión de peticiones HTTP. Nuestra misión es proporcionar a los
            desarrolladores una herramienta poderosa y fácil de usar que agilice
            el proceso de trabajo con solicitudes HTTP, desde su creación hasta
            la integración en proyectos.
          </p>

          <p>
            Con nuestro enfoque centrado en el usuario, hemos diseñado esta
            aplicación para simplificar las tareas diarias relacionadas con las
            API, permitiéndote concentrarte en la lógica y funcionalidad de tu
            aplicación en lugar de perder tiempo en la configuración manual de
            peticiones.
          </p>

          <p>
            Explora la creación intuitiva de peticiones, gestiona tu historial y
            favoritos con facilidad, personaliza la aplicación según tus
            preferencias y comparte tus configuraciones con otros
            desarrolladores. Nuestra aplicación está aquí para impulsar tu
            productividad y mejorar tu experiencia de desarrollo.
          </p>

          <p>
            ¡Comienza ahora y descubre cómo nuestra aplicación puede transformar
            la forma en que interactúas con las API!
          </p>
          <h2>Repaso de la Documentación</h2>

          <p>
            Esta documentación te guiará a través de todas las funciones clave
            de nuestra aplicación web, proporcionando información detallada
            sobre su uso y maximizando tu experiencia como usuario. Aquí hay un
            resumen de lo que encontrarás en este documento:
          </p>

          <h3>Capítulo 1: Generación de Peticiones</h3>
          <p>
            Explora cómo crear y enviar peticiones HTTP de manera eficiente.
            Aprende a utilizar la funcionalidad de conversión a código Dart para
            integrar fácilmente las solicitudes en tus proyectos.
          </p>

          <h3>Capítulo 2: Gestión de Peticiones</h3>
          <p>
            Descubre cómo guardar, organizar y gestionar tus peticiones
            generadas. Obtén información sobre el historial, favoritos y las
            opciones de edición y eliminación.
          </p>

          <h3>Capítulo 3: Configuración</h3>
          <p>
            Personaliza la aplicación según tus preferencias. Aprende a ajustar
            la configuración de la aplicación y del usuario para una experiencia
            de usuario óptima.
          </p>

          <h3>Capítulo 4: Importación y Exportación</h3>
          <p>
            Comprende cómo exportar e importar peticiones para compartir
            configuraciones y colaborar con otros desarrolladores.
          </p>

          <h2>Getting Started</h2>
          <p>
            Lee el apartado de <strong>Getting Started</strong> para conocer
            nuestra misión y cómo nuestra aplicación puede mejorar tu
            productividad en el desarrollo de aplicaciones.
          </p>

          <p>
            ¡Sumérgete en la documentación y aprovecha al máximo todas las
            características que nuestra aplicación tiene para ofrecer!
          </p>
        </>,
      ],
    ]),
  ],
  [
    "Generación de peticiones",
    new Map<Title, Content>([
      [
        "Creación de peticiones",
        <>
          <p>
            En este capítulo, se detalla el proceso para crear y enviar
            peticiones HTTP, así como la conversión de estas a código Dart.
          </p>
          <ul>
            <li>
              ■ Acceda a la pestaña <strong>Generar Petición </strong>
            </li>
            <li>
              ■ Seleccione el tipo de petición HTTP que desea generar (GET,
              POST, etc.)
            </li>
            <li> ■ Ingrese la URL a consultar</li>
            <li className="">■ Agregue los headers necesarios</li>
            <li>■ Ingrese los parámetros o body según corresponda</li>
            <li>
              ■ Haga clic en <strong>Enviar </strong> para generar la petición
            </li>
          </ul>
        </>,
      ],
      [
        "Resultado de petición",
        <>
          <p>
            En este fascinante viaje de exploración en el Capítulo 1,
            aprenderemos cómo dar vida a nuestras solicitudes HTTP. Desde la
            selección del tipo de petición hasta la gestión de los resultados,
            cada paso nos acerca más a la eficiencia en el desarrollo.
          </p>
          <li>
            El resultado de la petición aparecerá en el área de{" "}
            <strong>Response</strong>
          </li>
          <li>Podrá revisar los detalles como status, headers y body</li>
        </>,
      ],
      [
        "Conversión a código Dart",
        <>
          <li>
            Haga clic en el botón <strong>Convertir</strong> para transformar la
            petición a código Dart
          </li>
          <li>Seleccione las opciones de configuración de la conversión</li>
          <li>
            Obtenga el código Dart de la petición para usarlo en sus proyectos
          </li>
        </>,
      ],
      [
        "Guardado de peticiones",
        <>
          <p>
            Este capítulo aborda la gestión de las peticiones generadas,
            incluyendo su guardado, historial y opciones de edición.
          </p>
          <p>
            En el emocionante Capítulo 2, nos sumergiremos en la gestión
            inteligente de nuestras peticiones. Desde el acto de preservar
            nuestras creaciones hasta la habilidad de organizarlas en un
            historial y favoritos, este capítulo es la clave para una
            experiencia de usuario más fluida y productiva.
          </p>
          <ul>
            <li>
              Luego de generar una petición puede guardarla haciendo clic en{" "}
              <strong>Guardar Petición</strong>
            </li>
            <li>
              Agregue un nombre y una descripción para identificar esa petición
            </li>
          </ul>
        </>,
      ],
      [
        "Historial y favoritos",
        <>
          <ul>
            <li>
              Las peticiones guardadas aparecerán en el historial en la pestaña{" "}
              <strong>Mis Peticiones</strong>
            </li>
            <li>Puede añadirlas a Favoritos para una rápida ubicación</li>
          </ul>
        </>,
      ],
      [
        "Edición y eliminación",
        <>
          <ul>
            <li>Haga clic en una petición guardada para editar sus detalles</li>
            <li>Use los botones para actualizar o eliminar la petición</li>
          </ul>
        </>,
      ],
    ]),
  ],
  [
    "Configuración",
    new Map<Title, Content>([
      [
        "Configuración de la aplicación",
        <>
          <p>
            En este capítulo, se describen las opciones de configuración tanto
            de la aplicación como del usuario.
          </p>
          <ul>
            <li>
              Vaya a la pestaña de <strong>Configuración</strong>
            </li>
            <li>Elija opciones de tema, diseño y comportamientos</li>
          </ul>
        </>,
      ],
      [
        "Configuración de usuario",
        <>
          <p>
            Descubra un nuevo nivel de personalización en el Capítulo 3, donde
            exploraremos las diversas configuraciones que la aplicación tiene
            para ofrecer. Desde temas estéticos hasta opciones de
            comportamiento, aquí es donde su experiencia se adapta a sus
            preferencias.
          </p>
          <ul>
            <li>Seleccione su nombre de usuario y foto de perfil</li>
            <li>Gestione el comportamiento de las conversiones a Dart</li>
          </ul>
        </>,
      ],
      [
        "Exportar peticiones",
        <>
          <p>
            Este capítulo proporciona información sobre cómo exportar e importar
            peticiones para su posterior uso o compartirlas con otros usuarios.
          </p>
          <p>
            Finalmente, en el Capítulo 4, desentrañaremos los secretos de la
            importación y exportación de peticiones. Aprenda a compartir sus
            configuraciones y colaborar de manera efectiva con otros usuarios,
            ampliando así las posibilidades de su aplicación.
          </p>
          <ul>
            <li>Seleccione una o más peticiones guardadas</li>
            <li>Haga clic en el botón de exportación para descargarlas</li>
          </ul>
        </>,
      ],
      [
        "Importar peticiones",
        <>
          <ul>
            <li>Haga clic en el botón de importación</li>
            <li>
              Seleccione el archivo con extensión <strong>.json</strong> o{" "}
              <strong>.txt</strong>
            </li>
            <li>Las peticiones serán agregadas a su historial</li>
          </ul>
        </>,
      ],
    ]),
  ],
]);

const ChapterViewer: React.FC = () => {
  const [currentChapter, setCurrentChapter] = useState<Title>("Getting start");
  const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);

  const handleChapterClick = (chapter: Title) => {
    setCurrentChapter(chapter);
  };

  const handleSubtitleClick = (subtitle: string) => {
    const subtitleElement = document.getElementById(subtitle);
    console.log(subtitleElement);
    if (subtitleElement) {
      subtitleElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const subtitles = document.querySelectorAll(".subtitle");

      subtitles.forEach((subtitle) => {
        const rect = subtitle.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 4) {
          setCurrentSubtitle(subtitle.textContent);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mx-auto grid grid-cols-3">
      <div className="h-full w-[70%] relative box-border">
        <div className="p-4 fixed md:sticky top-16 left-0">
          {[...chapterContent.keys()].map((chapter) => (
            <h2 key={chapter} className={currentChapter === chapter ? "font-bold " : ""} onClick={() => handleChapterClick(chapter)}>
              {currentChapter === chapter ? "> " : "■ "}
              {chapter}
            </h2>
          ))}
        </div>
      </div>
      <div className="flex-grow mt-20 md:mt-0 w-full p-4">
        {currentChapter &&
          chapterContent.get(currentChapter) &&
          (typeof chapterContent.get(currentChapter) === "string" ? (
            <>
              <strong>{currentChapter}</strong>
              <br />
              {chapterContent.get(currentChapter)}
            </>
          ) : (
            <>
              <strong>{currentChapter}</strong>
              {currentChapter &&
                chapterContent.get(currentChapter) instanceof Map &&
                [
                  ...(
                    chapterContent.get(currentChapter) as Map<Title, Content>
                  ).keys(),
                ].map((subtitle, i) => (
                  <div key={subtitle}>
                    <strong id={subtitle} className="subtitle">
                      {subtitle}
                    </strong>{" "}
                    <br />
                    {(
                      chapterContent.get(currentChapter) as Map<Title, Content>
                    ).get(subtitle)}
                  </div>
                ))}
            </>
          ))}
        {/* Contenido dinámico según el capítulo actual */}
      </div>

      <div className="h-full hidden md:block w-[70%] relative box-border">
        <div className="flex-none sticky p-4 top-20 left-0">
          {currentChapter &&
            chapterContent.get(currentChapter) instanceof Map &&
            [
              ...(
                chapterContent.get(currentChapter) as Map<Title, Content>
              ).keys(),
            ].map((subtitle) => (
              <div
                key={subtitle}
                onClick={() => handleSubtitleClick(subtitle)}
                className="cursor-pointer "
                style={{
                  fontWeight: subtitle === currentSubtitle ? "bolder" : "",
                }}
              >
                {subtitle}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterViewer;
