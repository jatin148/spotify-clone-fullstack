import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlists from "./pages/Playlists";
import PlaylistDetail from "./pages/PlaylistDetail";
import ArtistDashboard from "./pages/ArtistDashboard";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Player />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PlayerProvider>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            style: {
                                background: "#282828",
                                color: "#fff",
                            },
                        }}
                    />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Layout><Home /></Layout>
                            </ProtectedRoute>
                        }/>
                        <Route path="/search" element={
                            <ProtectedRoute>
                                <Layout><Search /></Layout>
                            </ProtectedRoute>
                        }/>
                        <Route path="/playlists" element={
                            <ProtectedRoute>
                                <Layout><Playlists /></Layout>
                            </ProtectedRoute>
                        }/>
                        <Route path="/playlists/:playlistId" element={
                            <ProtectedRoute>
                                <Layout><PlaylistDetail /></Layout>
                            </ProtectedRoute>
                        }/>
                        <Route path="/dashboard" element={
                            <ProtectedRoute artistOnly={true}>
                                <Layout><ArtistDashboard /></Layout>
                            </ProtectedRoute>
                        }/>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </PlayerProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}