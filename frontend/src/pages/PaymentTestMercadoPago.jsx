import React, { useState } from 'react';
import axios from 'axios';

const PaymentTestMercadoPago = () => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    description: 'Teste de Pagamento Mercado Pago'
  });

  const [paymentResponse, setPaymentResponse] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/payment/create', paymentData);
      setPaymentResponse(response.data);
      window.location.href = response.data.init_point;
    } catch (error) {
      console.error('Error creating payment preference:', error);
    }
  };

  return (
    <div className="payment-test-container">
      <h1>Payment Test</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={paymentData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={paymentData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Generate Payment</button>
      </form>
      {paymentResponse && (
        <div>
          <h2>Payment Response:</h2>
          <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentTestMercadoPago;