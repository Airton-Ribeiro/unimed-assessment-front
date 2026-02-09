import { useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Layout } from "@components/Layout";
import { ContatoCard } from "@components/ContatoCard";
import { ContatoModal } from "../Contatos/components/ContatoModal";
import { ConfirmacaoModal } from "../Contatos/components/ConfirmacaoModal";
import { useContatos } from "@hooks/useContatos";
import type { Contato } from "../../types/contato.types";
import { FiHeart } from "react-icons/fi";

export function Favoritos() {
  const {
    contatos,
    carregando,
    erro,
    removerContato,
    reativarContato,
    alternarFavorito,
    carregarContatos,
  } = useContatos({ apenasFavoritos: true });

  const [modalAberto, setModalAberto] = useState(false);
  const [contatoSelecionado, setContatoSelecionado] = useState<Contato | null>(
    null,
  );
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [contatoParaExcluir, setContatoParaExcluir] = useState<number | null>(
    null,
  );

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
        <div className="mb-4">
          <h1 className="display-5 fw-bold d-flex align-items-center">
            <FiHeart className="me-3" style={{ color: "#00a859" }} />
            Contatos Favoritos
          </h1>
          <p className="text-muted">
            Aqui estão seus contatos marcados como favoritos
          </p>
        </div>

        {erro && (
          <Alert variant="danger" dismissible>
            {erro}
          </Alert>
        )}

        {carregando ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Carregando favoritos...</p>
          </div>
        ) : contatos.length === 0 ? (
          <Alert variant="info" className="text-center py-5">
            <FiHeart size={48} className="text-muted mb-3" />
            <h4>Nenhum favorito ainda</h4>
            <p className="mb-0">
              Marque os contatos importantes como favoritos para acessá-los
              rapidamente aqui
            </p>
          </Alert>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {contatos.map((contato) => (
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
          mensagem="Tem certeza que deseja inativar este contato favorito?"
        />
      </Container>
    </Layout>
  );
}
