export default class ResponseModel {
  public Enlace: string;
  public contentType: number;
  public jsonResponse: object | null | string;
  public classNameConvert?: string;
  public convertConvert?: string;
  constructor(
    Enlace?: string,
    contentType?: number,
    jsonResponse?: object | null | string,
    classNameConvert?: string,
    convertConvert?: string
  ) {
    this.Enlace = Enlace ?? "";
    this.contentType = contentType ?? 1;
    this.jsonResponse = jsonResponse ?? null;
    this.classNameConvert = classNameConvert ?? "";
    this.convertConvert = convertConvert ?? "";
  }

  copyWith({
    Enlace = this.Enlace,
    contentType = this.contentType,
    jsonResponse = this.jsonResponse,
    classNameConvert = this.classNameConvert,
    convertConvert = this.convertConvert,
  }: Partial<ResponseModel>): ResponseModel {
    return new ResponseModel(
      Enlace,
      contentType,
      jsonResponse,
      classNameConvert,
      convertConvert
    );
  }
}
