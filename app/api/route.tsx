import { getContentType } from "@/utils/helpers/validation_extension";

export async function POST(request: Request) {
  const req = await request.json();
  const url: string = req.url;
  const method: string = req.method;
  const headers: HeadersInit = req.headers;
  const body: BodyInit = req.body;
  const options: RequestInit = {
    method: method,
    headers: headers,
    body: body,
    keepalive: true,
  };

  try {
    const response: Response = await fetch(url, options);
    const contentTypeHeader = response.headers.get("Content-Type") ?? "*/*";
    const contentType: number = getContentType(contentTypeHeader);

    let json: object | string | null;
    if (contentType === 1) {
      let pru = await response.json();
      if (typeof pru == "object") {
        json = pru;
      } else {
        json = null;
      }
    } else if (contentType === 4) {
      json = await response.text();
    } else {
      json = null;
    }
    return Response.json({ status: 200, contentType, data: json });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Puedes agregar más lógica aquí para manejar diferentes tipos de errores
    if (error instanceof TypeError) {
      return Response.json({ status: 400, data: error.message });
    } else if (error instanceof SyntaxError) {
      return Response.json({ status: 422, data: error.message });
    } else {
      return Response.json({ status: 500, data: "Internal Server Error" });
    }
  }
}