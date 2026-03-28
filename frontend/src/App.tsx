import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Category from "./pages/category";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile";
import Registrar from "./pages/auth/Registrar";
import Transaction from "./pages/transaction";
import { useAuthStore } from "./stores/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const UnauthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuthStore();
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

function App() {
    return (
        <Routes>
            <Route path="/login" element={<UnauthenticatedRoute><Login /></UnauthenticatedRoute>} />
            <Route path="/registrar" element={<UnauthenticatedRoute><Registrar /></UnauthenticatedRoute>} />

            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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
