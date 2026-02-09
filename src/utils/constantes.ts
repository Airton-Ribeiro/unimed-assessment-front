/**
 * Constantes da aplicação
 */

// URLs da API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3333",
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
} as const;

// Chaves do LocalStorage
export const STORAGE_KEYS = {
  TOKEN: "@UnimedContatos:token",
  USER: "@UnimedContatos:usuario",
} as const;

// Mensagens de erro
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Erro de conexão. Verifique sua internet.",
  UNAUTHORIZED: "Sessão expirada. Faça login novamente.",
  FORBIDDEN: "Você não tem permissão para esta ação.",
  NOT_FOUND: "Recurso não encontrado.",
  SERVER_ERROR: "Erro no servidor. Tente novamente mais tarde.",
  REQUIRED_FIELD: "Este campo é obrigatório.",
  INVALID_EMAIL: "Email inválido.",
  INVALID_PHONE: "Telefone inválido.",
  DUPLICATE_CONTACT: "Já existe um contato com este celular.",
} as const;

// Mensagens de sucesso
export const SUCCESS_MESSAGES = {
  CREATED: "Criado com sucesso!",
  UPDATED: "Atualizado com sucesso!",
  DELETED: "Removido com sucesso!",
  FAVORITED: "Adicionado aos favoritos!",
  UNFAVORITED: "Removido dos favoritos!",
} as const;

// Configurações de paginação
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  ITEMS_PER_PAGE_OPTIONS: [6, 12, 24, 48],
} as const;

// Regex para validações
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CELULAR: /^\d{11}$/,
  TELEFONE: /^\d{10}$/,
  APENAS_NUMEROS: /\D/g,
} as const;

// Timeouts e delays
export const TIMEOUTS = {
  TOAST: 3000,
  DEBOUNCE: 500,
  LOADING_MIN: 300,
} as const;
