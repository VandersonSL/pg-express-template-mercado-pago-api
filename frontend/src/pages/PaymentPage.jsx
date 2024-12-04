import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    description: '',
    paymentMethod: 'pix'
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const processPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/payment/create', {
        amount: parseFloat(paymentDetails.amount),
        description: paymentDetails.description
      });

      // If payment is successful, navigate to success page
      if (response.data.id) {
        navigate('/success', { 
          state: { 
            paymentId: response.data.id,
            amount: paymentDetails.amount 
          } 
        });
      }
    } catch (error) {
      // If payment fails, navigate to error page
      navigate('/error');
      console.error('Payment Error:', error);
    }
  };

  return (
    <div className="payment-page">
      <form onSubmit={processPayment} className="payment-form">
        <h2>Realizar Pagamento</h2>
        <div className="form-group">
          <label>Valor do Pagamento</label>
          <input 
            type="number" 
            name="amount"
            value={paymentDetails.amount}
            onChange={handleInputChange}
            placeholder="Digite o valor"
            required
            min="1"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <input 
            type="text"
            name="description"
            value={paymentDetails.description}
            onChange={handleInputChange}
            placeholder="Descrição do pagamento"
            required
          />
        </div>
        <div className="form-group">
          <label>Método de Pagamento</label>
          <select 
            name="paymentMethod"
            value={paymentDetails.paymentMethod}
            onChange={handleInputChange}
          >
            <option value="pix">PIX</option>
            <option value="credit_card">Cartão de Crédito</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">
          Processar Pagamento
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;