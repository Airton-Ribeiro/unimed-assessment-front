import { describe, it, expect } from "vitest";
import {
  formatarCelular,
  formatarTelefone,
  removerFormatacao,
  validarEmail,
  validarCelular,
  validarTelefone,
  truncarTexto,
  formatarData,
} from "@utils/formatadores";

describe("Formatadores", () => {
  describe("formatarCelular", () => {
    it("deve formatar celular corretamente", () => {
      expect(formatarCelular("11999887766")).toBe("(11) 99988-7766");
    });

    it("deve retornar string vazia para entrada vazia", () => {
      expect(formatarCelular("")).toBe("");
    });

    it("deve retornar entrada original se não tiver 11 dígitos", () => {
      expect(formatarCelular("119998877")).toBe("119998877");
    });
  });

  describe("formatarTelefone", () => {
    it("deve formatar telefone corretamente", () => {
      expect(formatarTelefone("1133334444")).toBe("(11) 3333-4444");
    });

    it("deve retornar string vazia para entrada vazia", () => {
      expect(formatarTelefone("")).toBe("");
    });
  });

  describe("removerFormatacao", () => {
    it("deve remover formatação do celular", () => {
      expect(removerFormatacao("(11) 99988-7766")).toBe("11999887766");
    });

    it("deve remover formatação do telefone", () => {
      expect(removerFormatacao("(11) 3333-4444")).toBe("1133334444");
    });
  });

  describe("validarEmail", () => {
    it("deve validar email correto", () => {
      expect(validarEmail("teste@email.com")).toBe(true);
    });

    it("deve invalidar email sem @", () => {
      expect(validarEmail("testeemail.com")).toBe(false);
    });

    it("deve invalidar email sem domínio", () => {
      expect(validarEmail("teste@")).toBe(false);
    });
  });

  describe("validarCelular", () => {
    it("deve validar celular correto", () => {
      expect(validarCelular("11999887766")).toBe(true);
    });

    it("deve validar celular formatado", () => {
      expect(validarCelular("(11) 99988-7766")).toBe(true);
    });

    it("deve invalidar celular com menos dígitos", () => {
      expect(validarCelular("1199988776")).toBe(false);
    });
  });

  describe("validarTelefone", () => {
    it("deve validar telefone correto", () => {
      expect(validarTelefone("1133334444")).toBe(true);
    });

    it("deve validar telefone vazio (opcional)", () => {
      expect(validarTelefone("")).toBe(true);
    });

    it("deve invalidar telefone com menos dígitos", () => {
      expect(validarTelefone("113333444")).toBe(false);
    });
  });

  describe("truncarTexto", () => {
    it("deve truncar texto longo", () => {
      expect(truncarTexto("Texto muito longo", 10)).toBe("Texto muit...");
    });

    it("não deve truncar texto curto", () => {
      expect(truncarTexto("Texto", 10)).toBe("Texto");
    });
  });

  describe("formatarData", () => {
    it("deve formatar data ISO", () => {
      const data = "2024-01-15T10:30:00.000Z";
      const formatada = formatarData(data);
      expect(formatada).toContain("15");
      expect(formatada).toContain("01");
      expect(formatada).toContain("2024");
    });
  });
});
