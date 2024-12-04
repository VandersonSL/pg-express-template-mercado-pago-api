import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PaymentPage from './pages/PaymentPage';
import SucessoPage from './pages/SucessoPage';
import ErrorPage from './pages/ErrorPage';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Bem-vindo ao Sistema de Pagamentos</h1>
      <nav>
        <Link to="/payment" className="btn">
          Fazer Pagamento
        </Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<SucessoPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;