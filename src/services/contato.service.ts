import api from "./api";
import type {
  Contato,
  CriarContatoDTO,
  AtualizarContatoDTO,
  FiltrosContato,
} from "../types/contato.types";

class ContatoService {
  private readonly basePath = "/api/contatos";

  /**
   * Lista todos os contatos com filtros opcionais
   */
  async listar(filtros?: FiltrosContato): Promise<Contato[]> {
    const params = new URLSearchParams();

    if (filtros?.apenasAtivos !== undefined)
      params.append("apenasAtivos", String(filtros.apenasAtivos));
    if (filtros?.apenasInativos !== undefined)
      params.append("apenasInativos", String(filtros.apenasInativos));
    if (filtros?.apenasFavoritos !== undefined)
      params.append("apenasFavoritos", String(filtros.apenasFavoritos));

    const response = await api.get<{ success: boolean; data: Contato[] }>(
      `${this.basePath}${params.toString() ? "?" + params.toString() : ""}`,
    );

    return response.data.data;
  }

  /**
   * Busca um contato específico por ID
   */
  async buscarPorId(id: number): Promise<Contato> {
    const response = await api.get<{ success: boolean; data: Contato }>(
      `${this.basePath}/${id}`,
    );
    return response.data.data;
  }

  /**
   * Lista apenas os contatos favoritos
   */
  async listarFavoritos(): Promise<Contato[]> {
    return this.listar({ apenasFavoritos: true });
  }

  /**
   * Cria um novo contato
   */
  async criar(dados: CriarContatoDTO): Promise<Contato> {
    const response = await api.post<{
      success: boolean;
      message: string;
      data: Contato;
    }>(this.basePath, dados);
    return response.data.data;
  }

  /**
   * Atualiza um contato existente
   */
  async atualizar(id: number, dados: AtualizarContatoDTO): Promise<Contato> {
    const response = await api.put<{
      success: boolean;
      message: string;
      data: Contato;
    }>(`${this.basePath}/${id}`, dados);
    return response.data.data;
  }

  /**
   * Marca/desmarca contato como favorito
   */
  async alternarFavorito(id: number, favorito: boolean): Promise<Contato> {
    const response = await api.patch<{
      success: boolean;
      message: string;
      data: Contato;
    }>(`${this.basePath}/${id}/favorito`, { favorito });
    return response.data.data;
  }

  /**
   * Inativa um contato (soft delete)
   */
  async inativar(id: number): Promise<void> {
    await api.patch<{ success: boolean; message: string }>(
      `${this.basePath}/${id}/inativar`,
    );
  }

  /**
   * Reativa um contato inativo
   */
  async reativar(id: number): Promise<Contato> {
    const response = await api.patch<{
      success: boolean;
      message: string;
      data: Contato;
    }>(`${this.basePath}/${id}/reativar`);
    return response.data.data;
  }
}

export default new ContatoService();
