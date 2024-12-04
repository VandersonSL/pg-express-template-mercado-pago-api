import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <h1>Ops! Algo deu errado</h1>
        <p>Não foi possível processar seu pagamento.</p>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            Voltar para Início
          </Link>
          <Link to="/payment" className="btn btn-secondary">
            Tentar Novamente
          </Link>
        </div>
        <div className="error-details">
          <h3>Possíveis motivos:</h3>
          <ul>
            <li>Saldo insuficiente</li>
            <li>Dados de pagamento inválidos</li>
            <li>Problema de conexão</li>
            <li>Limite de transação excedido</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;