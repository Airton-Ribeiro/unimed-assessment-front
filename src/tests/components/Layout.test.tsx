import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@components/Footer";

// Mock do useAuth
const mockUseAuth = {
  usuario: {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
  },
  logout: vi.fn(),
  estaAutenticado: true,
  carregando: false,
};

vi.mock("@hooks/useAuth", () => ({
  useAuth: () => mockUseAuth,
}));

describe("Layout Components", () => {
  describe("Header", () => {
    it("deve renderizar a logo da Unimed", () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );

      const logo = screen.getByAltText(/Unimed Recife/i);
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", "/marca-unimed-recife.png");
    });

    it("deve renderizar o nome do usuário", () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );

      expect(screen.getByText("João Silva")).toBeInTheDocument();
    });

    it("deve renderizar links de navegação", () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );

      expect(screen.getByText("Contatos")).toBeInTheDocument();
      expect(screen.getByText("Favoritos")).toBeInTheDocument();
    });

    it("deve renderizar botão de sair", () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );

      expect(screen.getByText("Sair")).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("deve renderizar o texto do footer", () => {
      render(<Footer />);

      expect(
        screen.getByText(/Sistema de Agendamento Telefônico - Unimed/i),
      ).toBeInTheDocument();
    });

    it("deve renderizar o ano atual", () => {
      render(<Footer />);
      const anoAtual = new Date().getFullYear();

      expect(
        screen.getByText(new RegExp(anoAtual.toString())),
      ).toBeInTheDocument();
    });
  });
});
