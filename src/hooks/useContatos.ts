import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import contatoService from "@services/contato.service";
import type { Contato, FiltrosContato } from "../types/contato.types";

export function useContatos(filtrosIniciais?: FiltrosContato) {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<FiltrosContato>(filtrosIniciais || {});

  const carregarContatos = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const resposta = await contatoService.listar(filtros);
      setContatos(resposta);
    } catch (error: any) {
      const mensagem =
        error.response?.data?.message || "Erro ao carregar contatos";
      setErro(mensagem);
      toast.error(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  const removerContato = async (id: number) => {
    try {
      await contatoService.inativar(id);
      await carregarContatos();
      toast.success("Contato inativado com sucesso!");
    } catch (error: any) {
      const mensagem =
        error.response?.data?.message || "Erro ao inativar contato";
      toast.error(mensagem);
      throw error;
    }
  };

  const reativarContato = async (id: number) => {
    try {
      await contatoService.reativar(id);
      await carregarContatos();
      toast.success("Contato reativado com sucesso!");
    } catch (error: any) {
      const mensagem =
        error.response?.data?.message || "Erro ao reativar contato";
      toast.error(mensagem);
      throw error;
    }
  };

  const alternarFavorito = async (id: number) => {
    try {
      const contatoAtual = contatos.find((c) => c.id === id);
      if (!contatoAtual) {
        throw new Error("Contato não encontrado");
      }

      const novoStatusFavorito = !contatoAtual.favorito;
      const contatoAtualizado = await contatoService.alternarFavorito(
        id,
        novoStatusFavorito,
      );
      setContatos(contatos.map((c) => (c.id === id ? contatoAtualizado : c)));
      toast.success(
        contatoAtualizado.favorito
          ? "Contato adicionado aos favoritos!"
          : "Contato removido dos favoritos!",
      );
    } catch (error: any) {
      const mensagem =
        error.response?.data?.message || "Erro ao alterar favorito";
      toast.error(mensagem);
      throw error;
    }
  };

  const atualizarFiltros = (novosFiltros: FiltrosContato) => {
    setFiltros({ ...filtros, ...novosFiltros });
  };

  useEffect(() => {
    carregarContatos();
  }, [filtros]);

  return {
    contatos,
    carregando,
    erro,
    filtros,
    carregarContatos,
    removerContato,
    reativarContato,
    alternarFavorito,
    atualizarFiltros,
  };
}
