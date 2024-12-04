import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentTestMercadoPago.css'; // Custom styling

const PaymentTestMercadoPago = () => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    description: 'Bolt Service Payment',
    paymentMethod: '',
    installments: 1
  });

  const [paymentResponse, setPaymentResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setError({
        message: err.response?.data?.message || 'Payment Error',
        details: err.response?.data || err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bolt-payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h2>Complete Your Payment</h2>
          <p>Secure transaction powered by Bolt</p>
        </div>

        <form onSubmit={createPayment} className="bolt-payment-form">
          <div className="form-group">
            <label htmlFor="amount">Payment Amount</label>
            <div className="input-wrapper">
              <span className="currency-prefix">$</span>
              <input 
                id="amount"
                type="number" 
                name="amount"
                value={paymentData.amount}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev, 
                  amount: e.target.value
                }))}
                placeholder="0.00"
                required
                disabled={loading}
                className="bolt-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentData.paymentMethod}
              onChange={(e) => setPaymentData(prev => ({
                ...prev, 
                paymentMethod: e.target.value
              }))}
              required
              disabled={loading}
              className="bolt-select"
            >
              <option value="">Select Payment Method</option>
              <option value="pix">PIX</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
            </select>
          </div>

          {paymentData.paymentMethod === 'credit_card' && (
            <div className="form-group">
              <label htmlFor="installments">Installments</label>
              <select
                id="installments"
                name="installments"
                value={paymentData.installments}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev, 
                  installments: e.target.value
                }))}
                disabled={loading}
                className="bolt-select"
              >
                {[1, 2, 3, 6, 12].map(num => (
                  <option key={num} value={num}>
                    {num} x ${(paymentData.amount / num).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button 
            type="submit" 
            className="bolt-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>
        </form>

        {error && (
          <div className="bolt-error">
            <p>{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTestMercadoPago;