"use client";
// components/ChapterViewer.tsx
import React, { useEffect, useState } from "react";

type Title = string;
type Content = React.ReactNode | Map<Title, Content>;

const chapterContent: Map<Title, Content> = new Map<Title, Content>([
  [
    "Getting start",
    new Map<Title, Content>([
      [
        "How to start",
        <>
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          <br />
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
        </>,
      ],
      [
        "What can we do?",
        <>
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
        </>,
      ],
      [
        "Subcapítulo 3",
        <>
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
        </>,
      ],
    ]),
  ],
  [
    "Create request",
    new Map<Title, Content>([
      [
        "Subcapítulo 1",
        <>
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
        </>,
      ],
      [
        "Subcapítulo 2",
        <>
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
        </>,
      ],
      [
        "Subcapítulo 3",
        <>
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
        </>,
      ],
    ]),
  ],
  [
    "Send request",
    new Map<Title, Content>([
      [
        "Subcapítulo 1",
        <>
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
        </>,
      ],
      [
        "Subcapítulo 2",
        <>
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
          Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Magnam blanditiis eius earum est quidem itaque
          voluptatibus beatae, nihil neque, numquam consequatur sed
          reprehenderit et! Possimus totam incidunt odit saepe fugiat.,
        </>,
      ],
    ]),
  ],
  // Agrega más capítulos y contenido según sea necesario
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
    <div className="grid md:grid-cols-3">
      <div className="h-full w-full relative box-border">
        <div className="p-4 fixed md:sticky top-16 left-0">
          {[...chapterContent.keys()].map((chapter) => (
            <h2 key={chapter} onClick={() => handleChapterClick(chapter)}>
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

      <div className="h-full hidden md:block w-full relative box-border">
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
