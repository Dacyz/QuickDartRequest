interface Item {
  Method: number;
  Enlace: string;
  Name: string;
  Description: string;
  Response: Response;
  Group: string;
  Tipo: number;
  jsonResponse: object | null;
  TimeStamp: number;
}

class ListItem implements Item {
  constructor(
    public Enlace: string,
    public Name: string,
    public Description: string,
    public Response: Response,
    public Method: number,
    public Tipo: number,
    public jsonResponse: object | null,
    public TimeStamp: number,
    public Group: string
  ) {
    this.Enlace = Enlace;
    this.Name = Name;
    this.Description = Description;
    this.Response = Response;
    this.jsonResponse = jsonResponse;
    this.Method = Method;
    this.Tipo = Tipo;
  }
}
