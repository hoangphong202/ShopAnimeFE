import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../pages/Login/LoginForm";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;
