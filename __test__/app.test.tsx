// app.test.tsx
import { getDayFromDate } from "@/utils/helpers/date_extension";
import { getContentType, regex } from "@/utils/helpers/validation_extension";

describe("Validación de tipo de contenido", () => {
  test("Contenido sin especificar", () => {
    expect(getContentType("")).toBe(0);
  });

  test("Contenido de aplicación sin especificar", () => {
    expect(getContentType("application/")).toBe(0);
  });

  test("Contenido de imagen", () => {
    expect(getContentType("image/")).toBe(2);
  });

  test("Contenido de video", () => {
    expect(getContentType("video/")).toBe(3);
  });

  test("Contenido de texto", () => {
    expect(getContentType("text/")).toBe(4);
  });

  test("Contenido que no coincide con ningún tipo", () => {
    expect(getContentType("audio/mpeg")).toBe(0);
  });
});

describe("Validación de expresión regular", () => {
  test("URL válida", () => {
    const validURL = "https://www.ejemplo.com";
    expect(regex.test(validURL)).toBe(true);
  });

  test("URL inválida", () => {
    const invalidURL = "www.ejemplo.com";
    expect(regex.test(invalidURL)).toBe(false);
  });
});

describe("Validación de fechas", () => {
  test("Valor erróneo", () => {
    const value = getDayFromDate(0);
    expect(value).toBe("");
  });

  test("Sin valor", () => {
    const value = getDayFromDate();
    expect(value).toBe("");
  });

  test("Valor correcto", () => {
    const now = Date.now();
    const value = getDayFromDate(now);
    expect(value).toMatch(/^\d{4}-\d{2}-\d{2}$/); // Asegura que el formato es correcto
  });
});
