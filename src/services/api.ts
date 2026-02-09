import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { toast } from "react-toastify";

// Configuração base da API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

// Criando instância do axios
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição - adiciona token de autenticação
api.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    const token = localStorage.getItem("@UnimedContatos:token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Interceptor de resposta - tratamento de erros
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Não autenticado - redirecionar para login
          localStorage.removeItem("@UnimedContatos:token");
          localStorage.removeItem("@UnimedContatos:usuario");
          window.location.href = "/login";
          toast.error("Sessão expirada. Faça login novamente.");
          break;

        case 403:
          toast.error("Acesso negado. Você não tem permissão para esta ação.");
          break;

        case 404:
          toast.error("Recurso não encontrado.");
          break;

        case 500:
          toast.error("Erro interno do servidor. Tente novamente mais tarde.");
          break;

        default:
          const mensagem =
            (error.response.data as any)?.message ||
            (error.response.data as any)?.mensagem ||
            "Erro ao processar requisição.";
          toast.error(mensagem);
      }
    } else if (error.request) {
      toast.error("Sem resposta do servidor. Verifique sua conexão.");
    } else {
      toast.error("Erro ao configurar requisição.");
    }

    return Promise.reject(error);
  },
);

export default api;
