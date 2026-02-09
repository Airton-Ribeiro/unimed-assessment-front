import { Card, Badge } from "react-bootstrap";
import {
  FiMail,
  FiPhone,
  FiSmartphone,
  FiHeart,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import type { Contato } from "../types/contato.types";
import "./ContatoCard.css";

interface ContatoCardProps {
  contato: Contato;
  onEditar: (contato: Contato) => void;
  onExcluir: (id: number) => void;
  onAlternarFavorito: (id: number) => void;
  onReativar?: (id: number) => void;
}

export function ContatoCard({
  contato,
  onEditar,
  onExcluir,
  onAlternarFavorito,
  onReativar,
}: ContatoCardProps) {
  const formatarCelular = (celular: string) => {
    return celular.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const formatarTelefone = (telefone: string) => {
    return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  };

  return (
    <Card className="contato-card h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <Card.Title className="mb-1">{contato.nome}</Card.Title>
            <div className="d-flex gap-2">
              {contato.favorito && (
                <Badge
                  bg="danger"
                  className="d-flex align-items-center gap-1"
                  style={{ backgroundColor: "#00a859", borderColor: "#00a859" }}
                >
                  <FiHeart size={12} />
                  Favorito
                </Badge>
              )}
              {!contato.ativo && <Badge bg="secondary">Inativo</Badge>}
            </div>
          </div>

          <button
            onClick={() => onAlternarFavorito(contato.id)}
            className={`btn-favorito ${contato.favorito ? "favorito-ativo" : ""}`}
            title={
              contato.favorito
                ? "Remover dos favoritos"
                : "Adicionar aos favoritos"
            }
          >
            <FiHeart size={20} />
          </button>
        </div>

        <div className="contato-info">
          <div className="info-item">
            <FiMail className="info-icon" />
            <a href={`mailto:${contato.email}`} className="info-link">
              {contato.email}
            </a>
          </div>

          <div className="info-item">
            <FiSmartphone className="info-icon" />
            <a href={`tel:${contato.celular}`} className="info-link">
              {formatarCelular(contato.celular)}
            </a>
          </div>

          {contato.telefone && (
            <div className="info-item">
              <FiPhone className="info-icon" />
              <a href={`tel:${contato.telefone}`} className="info-link">
                {formatarTelefone(contato.telefone)}
              </a>
            </div>
          )}
        </div>

        <div className="d-flex gap-2 mt-3">
          <button
            onClick={() => onEditar(contato)}
            className="btn btn-sm btn-outline-primary flex-fill"
          >
            <FiEdit2 className="me-1" />
            Editar
          </button>

          {contato.ativo ? (
            <button
              onClick={() => onExcluir(contato.id)}
              className="btn btn-sm btn-outline-danger flex-fill"
            >
              <FiTrash2 className="me-1" />
              Inativar
            </button>
          ) : (
            <button
              onClick={() => onReativar && onReativar(contato.id)}
              className="btn btn-sm btn-outline-primary flex-fill"
              style={{ borderColor: "#00a859", color: "#00a859" }}
            >
              <FiEdit2 className="me-1" />
              Ativar
            </button>
          )}
        </div>
      </Card.Body>

      <Card.Footer className="text-muted small">
        Cadastrado em: {new Date(contato.criadoEm).toLocaleDateString("pt-BR")}
      </Card.Footer>
    </Card>
  );
}
