import { useState, FormEvent } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useAuth } from "@hooks/useAuth";
import "./Login.css";

type Step = "email" | "code";

export function Login() {
  const { sendCode, verifyCode, carregando } = useAuth();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [erro, setErro] = useState("");

  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!email) {
      setErro("Preencha o email");
      return;
    }

    try {
      await sendCode({ email });
      setStep("code");
    } catch (error) {
      setErro("Erro ao enviar código. Verifique o email informado.");
    }
  };

  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!code) {
      setErro("Preencha o código");
      return;
    }

    if (code.length !== 6) {
      setErro("O código deve ter exatamente 6 dígitos");
      return;
    }

    console.log("🔐 Verificando código:", {
      email,
      code,
      codeLength: code.length,
    });

    try {
      await verifyCode({ email, code });
    } catch (error: any) {
      console.error(
        "❌ Erro ao verificar código:",
        error?.response?.data || error,
      );
      const mensagemErro =
        error?.response?.data?.message || "Código inválido ou expirado";
      setErro(mensagemErro);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setCode("");
    setErro("");
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 login-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <img
                    src="/marca-unimed-recife.png"
                    alt="Unimed Recife"
                    className="login-logo"
                  />
                  <h2 className="fw-bold text-primary">Unimed Contatos</h2>
                  <p className="text-muted">
                    Sistema de Agendamento Telefônico
                  </p>
                </div>

                {erro && (
                  <Alert
                    variant="danger"
                    dismissible
                    onClose={() => setErro("")}
                  >
                    {erro}
                  </Alert>
                )}

                {step === "email" ? (
                  <Form onSubmit={handleSendCode}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={carregando}
                        autoFocus
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-100"
                      disabled={carregando}
                    >
                      {carregando ? "Enviando..." : "Enviar Código"}
                    </Button>

                    <div className="text-center mt-4">
                      <small className="text-muted">
                        Um código de 6 dígitos será enviado para seu email
                      </small>
                    </div>
                  </Form>
                ) : (
                  <Form onSubmit={handleVerifyCode}>
                    <div className="mb-3">
                      <small className="text-muted">
                        Código enviado para: <strong>{email}</strong>
                      </small>
                    </div>

                    <Form.Group className="mb-3" controlId="code">
                      <Form.Label>Código de Verificação</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="000000"
                        value={code}
                        onChange={(e) =>
                          setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        disabled={carregando}
                        maxLength={6}
                        autoFocus
                      />
                      <Form.Text className="text-muted">
                        Digite o código de 6 dígitos recebido por email
                      </Form.Text>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-100 mb-2"
                      disabled={carregando}
                    >
                      {carregando ? "Verificando..." : "Verificar Código"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline-secondary"
                      size="lg"
                      className="w-100"
                      onClick={handleBackToEmail}
                      disabled={carregando}
                    >
                      Voltar
                    </Button>

                    <div className="text-center mt-4">
                      <small className="text-muted">
                        O código expira em 10 minutos
                      </small>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
