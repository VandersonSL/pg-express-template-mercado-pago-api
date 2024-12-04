import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SucessoPage = () => {
  const location = useLocation();
  const { paymentId, amount } = location.state || {};

  return (
    <div className="success-page">
      <div className="success-container">
        <h1>Pagamento Realizado com Sucesso!</h1>
        <div className="success-details">
          <p>Número do Pagamento: <strong>{paymentId || 'N/A'}</strong></p>
          <p>Valor Pago: <strong>R$ {amount || 'N/A'}</strong></p>
        </div>
        <div className="success-actions">
          <Link to="/" className="btn btn-primary">
            Voltar para Início
          </Link>
          <a href="/comprovante" className="btn btn-secondary">
            Baixar Comprovante
          </a>
        </div>
        <div className="success-message">
          <p>Obrigado por sua compra!</p>
          <p>Em caso de dúvidas, entre em contato com nosso suporte.</p>
        </div>
      </div>
    </div>
  );
};

export default SucessoPage;