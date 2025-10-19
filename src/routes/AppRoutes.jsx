import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../pages/Login/LoginForm";
import ChatRoom from "../pages/Chat/ChatRoom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/chat" element={<ChatRoom />} />
            </Routes>
        </Router>
    );
}

export default App;
