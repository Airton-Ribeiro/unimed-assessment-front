export interface Usuario {
  id?: number;
  nome: string;
  email: string;
}

export interface SendCodeDTO {
  email: string;
}

export interface VerifyCodeDTO {
  email: string;
  code: string;
}

export interface AuthContextData {
  usuario: Usuario | null;
  estaAutenticado: boolean;
  carregando: boolean;
  sendCode: (dados: SendCodeDTO) => Promise<{ message: string }>;
  verifyCode: (dados: VerifyCodeDTO) => Promise<void>;
  logout: () => void;
}
