type Title = string;
type Content = React.ReactNode | Map<Title, Content>;

const chapterContent: Map<Title, Content> = new Map<Title, Content>([
  ["Capítulo 1", <>Node</>],
  [
    "Capítulo 2",
    new Map<Title, Content>([
      [
        "Subcapítulo 1",
        "Contenido del subcapítulo 1. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam blanditiis eius earum est quidem itaque voluptatibus beatae, nihil neque, numquam consequatur sed reprehenderit et! Possimus totam incidunt odit saepe fugiat.",
      ],
    ]),
  ],
  // Agrega más capítulos y contenido según sea necesario
]);