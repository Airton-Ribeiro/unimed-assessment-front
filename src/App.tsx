import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@contexts/AuthContext";
import { RotaPrivada } from "@components/RotaPrivada";
import { Login } from "@pages/Login/Login";
import { Contatos } from "@pages/Contatos/Contatos";
import { Favoritos } from "@pages/Favoritos/Favoritos";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <RotaPrivada>
                <Contatos />
              </RotaPrivada>
            }
          />

          <Route
            path="/favoritos"
            element={
              <RotaPrivada>
                <Favoritos />
              </RotaPrivada>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
