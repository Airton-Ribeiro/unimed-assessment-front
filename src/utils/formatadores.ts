/**
 * Formata um número de celular brasileiro (11 dígitos)
 * @param celular - String com 11 dígitos
 * @returns String formatada: (XX) XXXXX-XXXX
 */
export function formatarCelular(celular: string): string {
  if (!celular) return "";
  const numeros = celular.replace(/\D/g, "");
  if (numeros.length !== 11) return celular;
  return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

/**
 * Formata um número de telefone fixo brasileiro (10 dígitos)
 * @param telefone - String com 10 dígitos
 * @returns String formatada: (XX) XXXX-XXXX
 */
export function formatarTelefone(telefone: string): string {
  if (!telefone) return "";
  const numeros = telefone.replace(/\D/g, "");
  if (numeros.length !== 10) return telefone;
  return numeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

/**
 * Remove formatação de um telefone/celular
 * @param valor - String formatada
 * @returns String apenas com números
 */
export function removerFormatacao(valor: string): string {
  return valor.replace(/\D/g, "");
}

/**
 * Valida formato de email
 * @param email - String para validar
 * @returns Boolean indicando se é válido
 */
export function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida formato de celular (11 dígitos)
 * @param celular - String para validar
 * @returns Boolean indicando se é válido
 */
export function validarCelular(celular: string): boolean {
  const numeros = removerFormatacao(celular);
  return /^\d{11}$/.test(numeros);
}

/**
 * Valida formato de telefone fixo (10 dígitos)
 * @param telefone - String para validar
 * @returns Boolean indicando se é válido
 */
export function validarTelefone(telefone: string): boolean {
  if (!telefone) return true; // Telefone é opcional
  const numeros = removerFormatacao(telefone);
  return /^\d{10}$/.test(numeros);
}

/**
 * Trunca um texto longo adicionando reticências
 * @param texto - Texto para truncar
 * @param tamanhoMax - Tamanho máximo
 * @returns Texto truncado
 */
export function truncarTexto(texto: string, tamanhoMax: number): string {
  if (!texto || texto.length <= tamanhoMax) return texto;
  return texto.substring(0, tamanhoMax) + "...";
}

/**
 * Formata uma data para o padrão brasileiro
 * @param data - String ISO ou Date
 * @returns String formatada: DD/MM/YYYY
 */
export function formatarData(data: string | Date): string {
  const dataObj = typeof data === "string" ? new Date(data) : data;
  return dataObj.toLocaleDateString("pt-BR");
}

/**
 * Formata uma data com hora
 * @param data - String ISO ou Date
 * @returns String formatada: DD/MM/YYYY HH:MM
 */
export function formatarDataHora(data: string | Date): string {
  const dataObj = typeof data === "string" ? new Date(data) : data;
  return dataObj.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Calcula há quanto tempo uma data ocorreu
 * @param data - String ISO ou Date
 * @returns String descritiva
 */
export function tempoDecorrido(data: string | Date): string {
  const dataObj = typeof data === "string" ? new Date(data) : data;
  const agora = new Date();
  const diferenca = agora.getTime() - dataObj.getTime();

  const segundos = Math.floor(diferenca / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const meses = Math.floor(dias / 30);
  const anos = Math.floor(dias / 365);

  if (anos > 0) return `${anos} ano${anos > 1 ? "s" : ""} atrás`;
  if (meses > 0) return `${meses} mes${meses > 1 ? "es" : ""} atrás`;
  if (dias > 0) return `${dias} dia${dias > 1 ? "s" : ""} atrás`;
  if (horas > 0) return `${horas} hora${horas > 1 ? "s" : ""} atrás`;
  if (minutos > 0) return `${minutos} minuto${minutos > 1 ? "s" : ""} atrás`;
  return "agora mesmo";
}
