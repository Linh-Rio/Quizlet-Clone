import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/authform" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

export default App;
