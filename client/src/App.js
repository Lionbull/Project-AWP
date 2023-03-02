import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddBook from './components/AddBook';
import ShowBook from './components/ShowBook';
import Header from './components/Header';
import { Suspense } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PostsPage from './components/PostsPage';

function App() {
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/" element={<AddBook />} />
            <Route path="/book/:name" element={<ShowBook />} />
            <Route path="/error" element={<ShowBook />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
