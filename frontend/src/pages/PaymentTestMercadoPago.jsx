import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentTestMercadoPago.css';

const PaymentTestMercadoPago = () => {
  // State management with more robust initial state
  const [paymentData, setPaymentData] = useState({
    amount: '',
    description: 'Bolt Service Payment',
    paymentMethod: '',
    installments: 1,
    customerName: '',
    email: ''
  });

  // Enhanced state management
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validation function
  const validateForm = () => {
    const { amount, paymentMethod, customerName, email } = paymentData;
    
    if (!amount || parseFloat(amount) <= 0) {
      setError({ message: 'Invalid amount' });
      return false;
    }

    if (!paymentMethod) {
      setError({ message: 'Select a payment method' });
      return false;
    }

    if (!customerName || customerName.length < 2) {
      setError({ message: 'Enter a valid name' });
      return false;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError({ message: 'Enter a valid email' });
      return false;
    }

    return true;
  };

  // Payment creation method with improved error handling
  const createPayment = async (e) => {
    e.preventDefault();
    
    // Reset previous states
    setError(null);
    setPaymentResponse(null);

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/payment/create', {
        ...paymentData,
        amount: parseFloat(paymentData.amount)
      });

      setPaymentResponse(response.data);
    } catch (err) {
      setError({
        message: err.response?.data?.message || 'Unexpected Payment Error',
        details: err.response?.data || err.message
      });
    } finally {
      setLoading(false);
    }
  };

  // Dynamic input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bolt-payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h2>Complete Your Payment</h2>
          <p>Secure transaction powered by Bolt</p>
        </div>

        <form onSubmit={createPayment} className="bolt-payment-form">
          {/* Customer Name Input */}
          <div className="form-group">
            <label htmlFor="customerName">Full Name</label>
            <input
              id="customerName"
              type="text"
              name="customerName"
              value={paymentData.customerName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              className="bolt-input"
              disabled={loading}
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={paymentData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              className="bolt-input"
              disabled={loading}
            />
          </div>

          {/* Amount Input */}
          <div className="form-group">
            <label htmlFor="amount">Payment Amount</label>
            <div className="input-wrapper">
              <span className="currency-prefix">$</span>
              <input 
                id="amount"
                type="number" 
                name="amount"
                value={paymentData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                min="1"
                step="0.01"
                required
                className="bolt-input"
                disabled={loading}
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentData.paymentMethod}
              onChange={handleInputChange}
              required
              className="bolt-select"
              disabled={loading}
            >
              <option value="">Select Payment Method</option>
              <option value="pix">PIX</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
            </select>
          </div>

          {/* Installment Options for Credit Card */}
          {paymentData.paymentMethod === 'credit_card' && (
            <div className="form-group">
              <label htmlFor="installments">Installments</label>
              <select
                id="installments"
                name="installments"
                value={paymentData.installments}
                onChange={handleInputChange}
                className="bolt-select"
                disabled={loading}
              >
                {[1, 2, 3, 6, 12].map(num => (
                  <option key={num} value={num}>
                    {num} x ${(paymentData.amount / num).toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="bolt-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>
        </form>

        {/* Error Handling */}
        {error && (
          <div className="bolt-error">
            <p>{error.message}</p>
          </div>
        )}

        {/* Payment Response Display */}
        {paymentResponse && (
          <div className="payment-response">
            <h3>Payment Successful</h3>
            <p>Transaction ID: {paymentResponse.id}</p>
            <p>Status: {paymentResponse.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTestMercadoPago;