import React, { useState } from 'react';
import axios from 'axios';

const PaymentTestMercadoPago = () => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    description: 'Teste de Pagamento Mercado Pago'
  });

  const [paymentResponse, setPaymentResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const createPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPaymentResponse(null);

    try {
      const response = await axios.post('/api/payment/create', {
        amount: parseFloat(paymentData.amount),
        description: paymentData.description
      });

      setPaymentResponse(response.data);
    } catch (err) {
      console.error('Erro no pagamento:', err);
      setError({
        message: err.response?.data?.message || 'Erro desconhecido',
        details: err.response?.data || err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>Teste de Pagamento Mercado Pago</h1>
      
      <form onSubmit={createPayment} className="payment-form">
        <div className="form-group">
          <label htmlFor="amount">Valor do Pagamento</label>
          <input 
            id="amount"
            type="number" 
            name="amount"
            value={paymentData.amount}
            onChange={handleInputChange}
            placeholder="Digite o valor"
            min="1"
            step="0.01"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <input 
            id="description"
            type="text"
            name="description"
            value={paymentData.description}
            onChange={handleInputChange}
            placeholder="Descrição do pagamento"
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="btn-submit"
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Criar Pagamento'}
        </button>
      </form>

      {error && (
        <div className="error-section">
          <h3>Erro no Pagamento</h3>
          <p>{error.message}</p>
          <pre>{JSON.stringify(error.details, null, 2)}</pre>
        </div>
      )}

      {paymentResponse && (
        <div className="response-section">
          <h3>Resposta do Pagamento</h3>
          <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentTestMercadoPago;