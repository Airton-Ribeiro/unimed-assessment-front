import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type {
  AuthContextData,
  Usuario,
  SendCodeDTO,
  VerifyCodeDTO,
} from "../types/auth.types";
import authService from "@services/auth.service";

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  // Carrega o usuário do localStorage ao iniciar
  useEffect(() => {
    const usuarioArmazenado = authService.obterUsuario();
    const token = authService.obterToken();

    if (usuarioArmazenado && token) {
      setUsuario(usuarioArmazenado);
    }

    setCarregando(false);
  }, []);

  const sendCode = async (dados: SendCodeDTO) => {
    try {
      setCarregando(true);
      const response = await authService.sendCode(dados);
      toast.success(response.message || "Código enviado com sucesso!");
      return response;
    } catch (error) {
      toast.error("Falha ao enviar código. Verifique o email informado.");
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const verifyCode = async (dados: VerifyCodeDTO) => {
    try {
      setCarregando(true);
      const usuarioLogado = await authService.verifyCode(dados);
      setUsuario(usuarioLogado);
      toast.success(`Bem-vindo, ${usuarioLogado.nome}!`);
      navigate("/");
    } catch (error: any) {
      // Não mostra toast aqui para evitar duplicação
      // A mensagem de erro é tratada no componente Login
      console.error(
        "❌ Erro no verifyCode do contexto:",
        error?.response?.data || error,
      );
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUsuario(null);
    toast.info("Você saiu do sistema.");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado: !!usuario,
        carregando,
        sendCode,
        verifyCode,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
