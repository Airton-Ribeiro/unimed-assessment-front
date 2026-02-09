// Tipos da entidade Contato baseados na API
export interface Contato {
  id: number;
  nome: string;
  email: string;
  celular: string;
  telefone: string | null;
  favorito: boolean;
  ativo: boolean;
  criadoEm: string;
}

// DTO para criação de contato
export interface CriarContatoDTO {
  nome: string;
  email: string;
  celular: string;
  telefone?: string;
}

// DTO para atualização de contato
export interface AtualizarContatoDTO {
  nome?: string;
  email?: string;
  telefone?: string;
}

// Filtros para busca de contatos
export interface FiltrosContato {
  apenasAtivos?: boolean;
  apenasInativos?: boolean;
  apenasFavoritos?: boolean;
}

// Resposta paginada da API
export interface RespostaPaginada<T> {
  data: T[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
}

// Resposta padrão da API
export interface RespostaAPI<T = unknown> {
  sucesso: boolean;
  mensagem?: string;
  dados?: T;
  erro?: string;
}
