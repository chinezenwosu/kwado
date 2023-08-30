import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Client from './Client';

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
          <Route path='/' element={< Home />}></Route>
          <Route path='/diary/:id' element={< Client />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App