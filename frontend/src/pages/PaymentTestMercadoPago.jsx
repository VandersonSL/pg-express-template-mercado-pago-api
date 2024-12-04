import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentTestMercadoPago = () => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    description: 'Teste de Pagamento Mercado Pago',
    paymentMethod: '',
    installments: 1
  });

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch available payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get('/api/payment-methods');
        setPaymentMethods(response.data);
      } catch (err) {
        console.error('Erro ao buscar métodos de pagamento:', err);
      }
    };

    fetchPaymentMethods();
  }, []);

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
        ...paymentData,
        amount: parseFloat(paymentData.amount)
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
          <label htmlFor="paymentMethod">Método de Pagamento</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentData.paymentMethod}
            onChange={handleInputChange}
            required
            disabled={loading}
          >
            <option value="">Selecione um método</option>
            <option value="pix">PIX</option>
            <option value="credit_card">Cartão de Crédito</option>
            <option value="debit_card">Cartão de Débito</option>
          </select>
        </div>

        {paymentData.paymentMethod === 'credit_card' && (
          <div className="form-group">
            <label htmlFor="installments">Parcelas</label>
            <select
              id="installments"
              name="installments"
              value={paymentData.installments}
              onChange={handleInputChange}
              disabled={loading}
            >
              {[1, 2, 3, 6, 12].map(num => (
                <option key={num} value={num}>
                  {num} x {(paymentData.amount / num).toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        <button 
          type="submit" 
          className="btn-submit"
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Criar Pagamento'}
        </button>
      </form>

      {paymentResponse && (
        <div className="response-section">
          <h3>Resposta do Pagamento</h3>
          <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
          
          {paymentResponse.qr_code && (
            <div className="qr-code-section">
              <h4>QR Code PIX</h4>
              <img 
                src={`data:image/png;base64,${paymentResponse.qr_code}`} 
                alt="QR Code PIX" 
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="error-section">
          <h3>Erro no Pagamento</h3>
          <p>{error.message}</p>
          <pre>{JSON.stringify(error.details, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentTestMercadoPago;