import { Modal, Button } from "react-bootstrap";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmacaoModalProps {
  show: boolean;
  onHide: () => void;
  onConfirmar: () => void;
  titulo: string;
  mensagem: string;
}

export function ConfirmacaoModal({
  show,
  onHide,
  onConfirmar,
  titulo,
  mensagem,
}: ConfirmacaoModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <FiAlertTriangle className="text-warning me-2" />
          {titulo}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-0">{mensagem}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirmar}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
