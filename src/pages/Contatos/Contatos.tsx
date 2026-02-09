import { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Layout } from "@components/Layout";
import { ContatoCard } from "@components/ContatoCard";
import { ContatoModal } from "./components/ContatoModal";
import { ConfirmacaoModal } from "./components/ConfirmacaoModal";
import { useContatos } from "@hooks/useContatos";
import type { Contato } from "../../types/contato.types";
import { useSearchParams } from "react-router-dom";

export function Contatos() {
  const [searchParams] = useSearchParams();
  const mostrarInativos = searchParams.get("inativos") === "true";

  const {
    contatos,
    carregando,
    erro,
    removerContato,
    reativarContato,
    alternarFavorito,
    carregarContatos,
  } = useContatos(mostrarInativos ? { apenasInativos: true } : {});

  const [modalAberto, setModalAberto] = useState(false);
  const [contatoSelecionado, setContatoSelecionado] = useState<Contato | null>(
    null,
  );
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [contatoParaExcluir, setContatoParaExcluir] = useState<number | null>(
    null,
  );
  const [termoBusca, setTermoBusca] = useState("");

  // Filtra contatos por busca
  const contatosFiltrados = useMemo(() => {
    if (!termoBusca) return contatos;

    const termo = termoBusca.toLowerCase();
    return contatos.filter(
      (c) =>
        c.nome.toLowerCase().includes(termo) ||
        c.email.toLowerCase().includes(termo) ||
        c.celular.includes(termo) ||
        (c.telefone && c.telefone.includes(termo)),
    );
  }, [contatos, termoBusca]);

  const handleNovoContato = () => {
    setContatoSelecionado(null);
    setModalAberto(true);
  };

  const handleEditarContato = (contato: Contato) => {
    setContatoSelecionado(contato);
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setContatoSelecionado(null);
  };

  const handleSalvoComSucesso = () => {
    handleFecharModal();
    carregarContatos();
  };

  const handleExcluirContato = (id: number) => {
    setContatoParaExcluir(id);
    setModalConfirmacao(true);
  };

  const confirmarExclusao = async () => {
    if (contatoParaExcluir) {
      await removerContato(contatoParaExcluir);
      setModalConfirmacao(false);
      setContatoParaExcluir(null);
    }
  };

  return (
    <Layout>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-5 fw-bold">
            {mostrarInativos ? "Contatos Inativos" : "Meus Contatos"}
          </h1>
          <Button variant="primary" size="lg" onClick={handleNovoContato}>
            <FiPlus className="me-2" />
            Novo Contato
          </Button>
        </div>

        {/* Campo de Busca */}
        <Form className="mb-4">
          <InputGroup size="lg">
            <InputGroup.Text>
              <FiSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por nome, email ou telefone..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </InputGroup>
        </Form>

        {erro && (
          <Alert variant="danger" dismissible>
            {erro}
          </Alert>
        )}

        {carregando ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Carregando contatos...</p>
          </div>
        ) : contatosFiltrados.length === 0 ? (
          <Alert variant="info" className="text-center py-5">
            <h4>Nenhum contato encontrado</h4>
            <p className="mb-0">
              {termoBusca
                ? "Tente buscar com outros termos"
                : "Comece adicionando seu primeiro contato"}
            </p>
          </Alert>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {contatosFiltrados.map((contato) => (
              <Col key={contato.id}>
                <ContatoCard
                  contato={contato}
                  onEditar={handleEditarContato}
                  onExcluir={handleExcluirContato}
                  onAlternarFavorito={alternarFavorito}
                  onReativar={reativarContato}
                />
              </Col>
            ))}
          </Row>
        )}

        <ContatoModal
          show={modalAberto}
          onHide={handleFecharModal}
          contato={contatoSelecionado}
          onSalvoComSucesso={handleSalvoComSucesso}
        />

        <ConfirmacaoModal
          show={modalConfirmacao}
          onHide={() => setModalConfirmacao(false)}
          onConfirmar={confirmarExclusao}
          titulo="Confirmar Inativação"
          mensagem="Tem certeza que deseja inativar este contato?"
        />
      </Container>
    </Layout>
  );
}
