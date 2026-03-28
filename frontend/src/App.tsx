import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Category from "./pages/Category";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile";
import Registrar from "./pages/auth/Registrar";
import Transaction from "./pages/transaction";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />

            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="transacoes" element={<Transaction />} />
                <Route path="categorias" element={<Category />} />
                <Route path="perfil" element={<Profile />} />
            </Route>
        </Routes>
    );
}

export default App;
