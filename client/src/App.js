import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import AuthForm from './pages/AuthForm';
import CreateSet from './pages/CreateSet/CreateSet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/authform" element={<AuthForm />} />
        <Route path="/create-set" element={<CreateSet />} />
      </Routes>
    </Router>
  );
}

export default App;
