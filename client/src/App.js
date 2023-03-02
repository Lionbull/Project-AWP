import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddBook from './components/AddBook';
import ShowBook from './components/ShowBook';

function App() {
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AddBook />} />
          <Route path="/book/:name" element={<ShowBook />} />
          <Route path="/error" element={<ShowBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
