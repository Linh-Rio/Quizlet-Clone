import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Home, AuthForm, CreateSet, ViewSet, Profile } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/authform" element={<AuthForm />} />
        <Route path="/create-set" element={<CreateSet />} />
        <Route path="/:setId/:setTitle" element={<ViewSet />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
