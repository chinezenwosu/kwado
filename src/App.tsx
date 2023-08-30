import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Room from './Room';

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
          <Route path='/diary/:id' element={< Room />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App