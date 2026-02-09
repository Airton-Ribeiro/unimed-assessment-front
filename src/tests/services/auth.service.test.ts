import { describe, it, expect, beforeEach } from "vitest";
import authService from "@services/auth.service";

describe("AuthService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("estaAutenticado", () => {
    it("deve retornar false quando não há token", () => {
      expect(authService.estaAutenticado()).toBe(false);
    });

    it("deve retornar true quando há token", () => {
      localStorage.setItem("@UnimedContatos:token", "fake-token");
      expect(authService.estaAutenticado()).toBe(true);
    });
  });

  describe("obterToken", () => {
    it("deve retornar null quando não há token", () => {
      expect(authService.obterToken()).toBeNull();
    });

    it("deve retornar o token quando existe", () => {
      const token = "fake-token";
      localStorage.setItem("@UnimedContatos:token", token);
      expect(authService.obterToken()).toBe(token);
    });
  });

  describe("obterUsuario", () => {
    it("deve retornar null quando não há usuário", () => {
      expect(authService.obterUsuario()).toBeNull();
    });

    it("deve retornar o usuário quando existe", () => {
      const usuario = {
        id: 1,
        nome: "Teste",
        email: "teste@email.com",
      };
      localStorage.setItem("@UnimedContatos:usuario", JSON.stringify(usuario));
      expect(authService.obterUsuario()).toEqual(usuario);
    });
  });

  describe("logout", () => {
    it("deve limpar o localStorage", () => {
      localStorage.setItem("@UnimedContatos:token", "fake-token");
      localStorage.setItem(
        "@UnimedContatos:usuario",
        JSON.stringify({ id: 1 }),
      );

      authService.logout();

      expect(localStorage.getItem("@UnimedContatos:token")).toBeNull();
      expect(localStorage.getItem("@UnimedContatos:usuario")).toBeNull();
    });
  });
});
