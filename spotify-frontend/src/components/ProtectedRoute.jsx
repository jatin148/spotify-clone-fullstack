import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, artistOnly = false }) {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;
    if (artistOnly && user.role !== "artist") return <Navigate to="/" />;

    return children;
}