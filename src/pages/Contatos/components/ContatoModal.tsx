import { useState, useEffect } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import contatoService from "@services/contato.service";
import type {
  Contato,
  CriarContatoDTO,
  AtualizarContatoDTO,
} from "../../../types/contato.types";

interface ContatoModalProps {
  show: boolean;
  onHide: () => void;
  contato: Contato | null;
  onSalvoComSucesso: () => void;
}

const validationSchema = Yup.object({
  nome: Yup.string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: Yup.string()
    .required("Email é obrigatório")
    .email("Email inválido")
    .max(255, "Email muito longo"),
  celular: Yup.string()
    .required("Celular é obrigatório")
    .matches(/^\d{11}$/, "Celular deve ter 11 dígitos (DDD + número)"),
  telefone: Yup.string()
    .matches(/^\d{10}$/, "Telefone deve ter 10 dígitos (DDD + número)")
    .nullable(),
});

export function ContatoModal({
  show,
  onHide,
  contato,
  onSalvoComSucesso,
}: ContatoModalProps) {
  const [salvando, setSalvando] = useState(false);

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      celular: "",
      telefone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSalvando(true);

      try {
        if (contato) {
          // Atualizar contato existente
          const dados: AtualizarContatoDTO = {
            nome: values.nome,
            email: values.email,
            telefone: values.telefone || undefined,
          };
          await contatoService.atualizar(contato.id, dados);
          toast.success("Contato atualizado com sucesso!");
        } else {
          // Criar novo contato
          const dados: CriarContatoDTO = {
            nome: values.nome,
            email: values.email,
            celular: values.celular,
            telefone: values.telefone || undefined,
          };
          await contatoService.criar(dados);
          toast.success("Contato criado com sucesso!");
        }

        onSalvoComSucesso();
        formik.resetForm();
      } catch (error: any) {
        const mensagem =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Erro ao salvar contato";
        toast.error(mensagem);
      } finally {
        setSalvando(false);
      }
    },
  });

  // Carrega dados do contato ao abrir modal para edição
  useEffect(() => {
    if (show && contato) {
      formik.setValues({
        nome: contato.nome,
        email: contato.email,
        celular: contato.celular,
        telefone: contato.telefone || "",
      });
    } else if (show && !contato) {
      formik.resetForm();
    }
  }, [show, contato]);

  // Formata celular automaticamente
  const formatarCelular = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 11);
  };

  // Formata telefone automaticamente
  const formatarTelefone = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 10);
  };

  const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = formatarCelular(e.target.value);
    formik.setFieldValue("celular", valor);
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = formatarTelefone(e.target.value);
    formik.setFieldValue("telefone", valor);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{contato ? "Editar Contato" : "Novo Contato"}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome completo"
              {...formik.getFieldProps("nome")}
              isInvalid={formik.touched.nome && !!formik.errors.nome}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nome}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              placeholder="email@exemplo.com"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="celular">
            <Form.Label>Celular *</Form.Label>
            <Form.Control
              type="tel"
              placeholder="11999999999"
              value={formik.values.celular}
              onChange={handleCelularChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.celular && !!formik.errors.celular}
              disabled={!!contato} // Celular não pode ser alterado
            />
            <Form.Text className="text-muted">
              {contato
                ? "O número de celular não pode ser alterado"
                : "DDD + 9 dígitos (sem espaços)"}
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {formik.errors.celular}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefone">
            <Form.Label>Telefone Fixo</Form.Label>
            <Form.Control
              type="tel"
              placeholder="1133334444"
              value={formik.values.telefone}
              onChange={handleTelefoneChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.telefone && !!formik.errors.telefone}
            />
            <Form.Text className="text-muted">
              DDD + 8 dígitos (sem espaços)
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {formik.errors.telefone}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={salvando}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={salvando}>
            {salvando ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Salvando...
              </>
            ) : (
              "Salvar"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
