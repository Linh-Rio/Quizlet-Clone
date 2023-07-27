import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Home, AuthForm, CreateSet, ViewSet } from './pages';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/authform" element={<AuthForm />} />
        <Route path="/create-set" element={<CreateSet />} />
        <Route path="/:setId/:setTitle" element={<ViewSet />} />
      </Routes>
    </Router>
  );
}

export default App;
