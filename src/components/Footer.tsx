import { Container } from "react-bootstrap";

export function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="bg-light border-top mt-5 py-4">
      <Container>
        <div className="text-center text-muted">
          <p className="mb-1">Sistema de Agendamento Telefônico - Unimed</p>
          <small>© {anoAtual} Todos os direitos reservados</small>
        </div>
      </Container>
    </footer>
  );
}
