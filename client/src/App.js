import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {
  Home,
  AuthForm,
  CreateSet,
  ViewSet,
  LearnFlashCards,
  Learn,
  Test,
  Match,
  Profile,
  NotFound,
  SetNotFound,
  Result,
} from './pages';

function App() {
  window.scrollTo(0, 0);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/authform" element={<AuthForm />} />
        <Route path="/create-set" element={<CreateSet />} />
        <Route path="/:setId/:setTitle" element={<ViewSet />} />
        <Route
          path="/:setId/flashcards"
          element={<LearnFlashCards />}
        />
        <Route path="/:setId/learn" element={<Learn />} />
        <Route path="/:setId/test" element={<Test />} />
        <Route path="/:setId/match" element={<Match />} />
        <Route path="/:setId/result" element={<Result />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/set-not-found" element={<SetNotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
