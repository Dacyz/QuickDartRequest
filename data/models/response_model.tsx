interface Item {
  Enlace: string;
  Name: URL;
  Response: Response;
  jsonResponse: object | null | string;
  TimeStamp: number;
}

class ResponseModel implements Item {
  constructor(
    public Enlace: string,
    public Name: URL,
    public Response: Response,
    public jsonResponse: object | null | string,
    public TimeStamp: number,
  ) {
    this.Enlace = Enlace;
    this.Name = Name;
    this.Response = Response;
    this.jsonResponse = jsonResponse;
  }
}
