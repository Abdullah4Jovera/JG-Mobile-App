import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
            const { data } = await axios.get(url, { withCredentials: true });
            if (data.message === "Successfully Logged In" && data.user) {
                setUser(data.user);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={user ? <Home user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    exact
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={user ? <Navigate to="/" /> : <Signup />}
                />
            </Routes>
        </div>
    );
}

export default App;
