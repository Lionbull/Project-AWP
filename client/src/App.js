import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Suspense } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PostsPage from './components/PostsPage';
import SiglePost from './components/SiglePost';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    // Suspense is used to show loading text while the page is loading
    <Suspense fallback={<div>{t ('Loading...')}</div>}>
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
