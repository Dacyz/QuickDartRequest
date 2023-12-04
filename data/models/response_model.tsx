interface Item {
  Enlace: string;
  Name: URL;
  contentType: number;
  jsonResponse: object | null | string;
  TimeStamp: number;
}

export default class ResponseModel implements Item {
  constructor(
    public Enlace: string,
    public Name: URL,
    public contentType: number,
    public jsonResponse: object | null | string,
    public readonly TimeStamp: number
  ) {
    this.Enlace = Enlace;
    this.Name = Name;
    this.contentType = contentType;
    this.jsonResponse = jsonResponse;
  }
}
