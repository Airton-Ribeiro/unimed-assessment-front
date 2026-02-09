import api from "./api";
import type { Usuario, SendCodeDTO, VerifyCodeDTO } from "../types/auth.types";

class AuthService {
  private readonly basePath = "/api/auth";
  private readonly TOKEN_KEY = "@UnimedContatos:token";
  private readonly USER_KEY = "@UnimedContatos:usuario";

  /**
   * Envia código de verificação por email
   */
  async sendCode(dados: SendCodeDTO): Promise<{ message: string }> {
    const response = await api.post<{ success: boolean; message: string }>(
      `${this.basePath}/send-code`,
      dados,
    );

    return { message: response.data.message };
  }

  /**
   * Verifica código de autenticação
   */
  async verifyCode(dados: VerifyCodeDTO): Promise<Usuario> {
    console.log("📤 Enviando requisição verify-code:", dados);

    const response = await api.post<{
      success: boolean;
      token: string;
      email: string;
      message?: string;
    }>(`${this.basePath}/verify-code`, dados);

    console.log("📥 Resposta verify-code:", response.data);

    const { token, email } = response.data;

    // Cria objeto de usuário com os dados disponíveis
    const usuario: Usuario = {
      email,
      nome: email.split("@")[0], // Usa a parte antes do @ como nome temporário
    };

    // Armazena token e dados do usuário
    this.salvarToken(token);
    this.salvarUsuario(usuario);

    return usuario;
  }

  /**
   * Realiza o logout do usuário
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Obtém o token armazenado
   */
  obterToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Obtém os dados do usuário armazenados
   */
  obterUsuario(): Usuario | null {
    const usuarioJson = localStorage.getItem(this.USER_KEY);
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  }

  /**
   * Verifica se o usuário está autenticado
   */
  estaAutenticado(): boolean {
    return !!this.obterToken();
  }

  /**
   * Salva o token no localStorage
   */
  private salvarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Salva os dados do usuário no localStorage
   */
  private salvarUsuario(usuario: Usuario): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(usuario));
  }
}

export default new AuthService();
