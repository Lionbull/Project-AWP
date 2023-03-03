import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Suspense } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PostsPage from './components/PostsPage';
import SiglePost from './components/SiglePost';

function App() {
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/post/:id" element={<SiglePost />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
