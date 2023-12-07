import ConvertRequest from "@/app/start/components/modes/convert-request";
import HttpRequest from "@/app/start/components/modes/http-request";
import ConvertSection from "@/components/other/convert-section";
import { ConvertRequestIcon, HttpRequestIcon } from "@/utils/icons/icon";

type module = {
  id: number;
  name: string;
  component: React.ReactNode;
  icon: React.ReactNode;
};

const modules: module[] = [
  {
    id: 0,
    name: "Http Request",
    component: (
      <>
        <HttpRequest />
        <ConvertSection />
      </>
    ),
    icon: <HttpRequestIcon />,
  },
  {
    id: 1,
    name: "Convert Request",
    component: <ConvertRequest />,
    icon: <ConvertRequestIcon />,
  },
  // {
  //   id: 2,
  //   name: "Socket Request",
  //   component: <SocketRequest />,
  //   icon: <SocketRequestIcon />,
  // },
];

export { modules,  }