import { describe, it, expect } from "vitest";

describe("Validações de Formulário", () => {
  describe("Validação de Nome", () => {
    it("deve aceitar nome válido", () => {
      const nome = "João Silva";
      const validarNome = (n: string) => n.length >= 3 && n.length <= 100;
      expect(validarNome(nome)).toBe(true);
    });

    it("deve rejeitar nome com menos de 3 caracteres", () => {
      const nome = "Jo";
      const validarNome = (n: string) => n.length >= 3 && n.length <= 100;
      expect(validarNome(nome)).toBe(false);
    });

    it("deve rejeitar nome com mais de 100 caracteres", () => {
      const nome = "a".repeat(101);
      const validarNome = (n: string) => n.length >= 3 && n.length <= 100;
      expect(validarNome(nome)).toBe(false);
    });
  });

  describe("Validação de Email", () => {
    it("deve aceitar email válido", () => {
      const email = "teste@email.com";
      const validarEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
      expect(validarEmail(email)).toBe(true);
    });

    it("deve rejeitar email sem @", () => {
      const email = "testeemail.com";
      const validarEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
      expect(validarEmail(email)).toBe(false);
    });

    it("deve rejeitar email sem domínio", () => {
      const email = "teste@";
      const validarEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
      expect(validarEmail(email)).toBe(false);
    });
  });

  describe("Validação de Celular", () => {
    it("deve aceitar celular válido com 11 dígitos", () => {
      const celular = "11999887766";
      const validarCelular = (c: string) => /^\d{11}$/.test(c);
      expect(validarCelular(celular)).toBe(true);
    });

    it("deve rejeitar celular com menos de 11 dígitos", () => {
      const celular = "1199988776";
      const validarCelular = (c: string) => /^\d{11}$/.test(c);
      expect(validarCelular(celular)).toBe(false);
    });

    it("deve rejeitar celular com caracteres não numéricos", () => {
      const celular = "11-99988-7766";
      const validarCelular = (c: string) => /^\d{11}$/.test(c);
      expect(validarCelular(celular)).toBe(false);
    });
  });

  describe("Validação de Telefone", () => {
    it("deve aceitar telefone válido com 10 dígitos", () => {
      const telefone = "1133334444";
      const validarTelefone = (t: string) => /^\d{10}$/.test(t);
      expect(validarTelefone(telefone)).toBe(true);
    });

    it("deve aceitar telefone vazio (campo opcional)", () => {
      const telefone = "";
      const validarTelefone = (t: string) => !t || /^\d{10}$/.test(t);
      expect(validarTelefone(telefone)).toBe(true);
    });

    it("deve rejeitar telefone inválido", () => {
      const telefone = "113333444";
      const validarTelefone = (t: string) => /^\d{10}$/.test(t);
      expect(validarTelefone(telefone)).toBe(false);
    });
  });
});
