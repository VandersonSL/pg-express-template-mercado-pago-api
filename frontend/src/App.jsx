import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentTestMercadoPago from './pages/PaymentTestMercadoPago';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PaymentTestMercadoPago />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;