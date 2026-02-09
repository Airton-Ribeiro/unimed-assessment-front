import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ContatoCard } from "@components/ContatoCard";
import type { Contato } from "../../types/contato.types";

const contatoMock: Contato = {
  id: 1,
  nome: "João Silva",
  email: "joao@email.com",
  celular: "11999887766",
  telefone: "1133334444",
  favorito: false,
  ativo: true,
  criadoEm: "2024-01-01T00:00:00.000Z",
};

describe("ContatoCard", () => {
  it("deve renderizar as informações do contato corretamente", () => {
    render(
      <BrowserRouter>
        <ContatoCard
          contato={contatoMock}
          onEditar={() => {}}
          onExcluir={() => {}}
          onAlternarFavorito={() => {}}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("joao@email.com")).toBeInTheDocument();
  });

  it("deve exibir badge de favorito quando o contato é favorito", () => {
    const contatoFavorito = { ...contatoMock, favorito: true };

    render(
      <BrowserRouter>
        <ContatoCard
          contato={contatoFavorito}
          onEditar={() => {}}
          onExcluir={() => {}}
          onAlternarFavorito={() => {}}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText("Favorito")).toBeInTheDocument();
  });

  it("deve exibir badge de inativo quando o contato está inativo", () => {
    const contatoInativo = { ...contatoMock, ativo: false };

    render(
      <BrowserRouter>
        <ContatoCard
          contato={contatoInativo}
          onEditar={() => {}}
          onExcluir={() => {}}
          onAlternarFavorito={() => {}}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText("Inativo")).toBeInTheDocument();
  });

  it("deve renderizar botões de ação", () => {
    render(
      <BrowserRouter>
        <ContatoCard
          contato={contatoMock}
          onEditar={() => {}}
          onExcluir={() => {}}
          onAlternarFavorito={() => {}}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Inativar")).toBeInTheDocument();
  });
});
