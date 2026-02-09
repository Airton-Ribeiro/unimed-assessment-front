import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { ReactNode } from "react";

interface RotaPrivadaProps {
  children: ReactNode;
}

export function RotaPrivada({ children }: RotaPrivadaProps) {
  const { estaAutenticado, carregando } = useAuth();

  if (carregando) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return estaAutenticado ? <>{children}</> : <Navigate to="/login" />;
}
