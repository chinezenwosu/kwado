import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Client from './Client';
import routes from './utils/routes';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
              <Link to="/">Home</Link>
          </li>
        </ul>
        <Routes>
          <Route path={routes.getHome()} element={< Home />}></Route>
          <Route path={routes.getDiary(':slug')} element={< Client />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App