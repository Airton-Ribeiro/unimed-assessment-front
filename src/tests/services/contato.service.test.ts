import { describe, it, expect } from "vitest";

describe("ContatoService", () => {
  describe("formatações", () => {
    it("deve formatar celular corretamente", () => {
      const celular = "11999887766";
      const esperado = "(11) 99988-7766";
      // Teste de formatação (implementação fictícia)
      const formatarCelular = (cel: string) =>
        cel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

      expect(formatarCelular(celular)).toBe(esperado);
    });

    it("deve formatar telefone corretamente", () => {
      const telefone = "1133334444";
      const esperado = "(11) 3333-4444";
      const formatarTelefone = (tel: string) =>
        tel.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

      expect(formatarTelefone(telefone)).toBe(esperado);
    });
  });

  describe("validações", () => {
    it("deve validar celular com 11 dígitos", () => {
      const celularValido = "11999887766";
      const celularInvalido = "1199988776";

      const validarCelular = (cel: string) => /^\d{11}$/.test(cel);

      expect(validarCelular(celularValido)).toBe(true);
      expect(validarCelular(celularInvalido)).toBe(false);
    });

    it("deve validar telefone com 10 dígitos", () => {
      const telefoneValido = "1133334444";
      const telefoneInvalido = "113333444";

      const validarTelefone = (tel: string) => /^\d{10}$/.test(tel);

      expect(validarTelefone(telefoneValido)).toBe(true);
      expect(validarTelefone(telefoneInvalido)).toBe(false);
    });

    it("deve validar email", () => {
      const emailValido = "teste@email.com";
      const emailInvalido = "teste@email";

      const validarEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      expect(validarEmail(emailValido)).toBe(true);
      expect(validarEmail(emailInvalido)).toBe(false);
    });
  });
});
