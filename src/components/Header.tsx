import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FiUser, FiLogOut, FiHeart, FiUsers, FiUserX } from "react-icons/fi";
import { useAuth } from "@hooks/useAuth";

export function Header() {
  const { usuario, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" && !location.search.includes("inativos");
    }
    if (path === "/?inativos=true") {
      return location.pathname === "/" && location.search.includes("inativos");
    }
    return location.pathname === path;
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/marca-unimed-recife.png"
            alt="Unimed Recife"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              active={isActive("/")}
              className="d-flex align-items-center"
            >
              <FiUsers className="me-2" />
              Contatos
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/favoritos"
              active={isActive("/favoritos")}
              className="d-flex align-items-center"
            >
              <FiHeart className="me-2" />
              Favoritos
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/?inativos=true"
              active={isActive("/?inativos=true")}
              className="d-flex align-items-center"
            >
              <FiUserX className="me-2" />
              Inativos
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <Navbar.Text className="me-3">
              <FiUser className="me-2" />
              {usuario?.nome || "Usuário"}
            </Navbar.Text>

            <Button
              variant="outline-light"
              size="sm"
              onClick={logout}
              className="d-flex align-items-center"
            >
              <FiLogOut className="me-2" />
              Sair
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
