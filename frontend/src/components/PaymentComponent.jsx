import React, { useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [paymentData, setPaymentData] = useState({
    amount: 100,
    description: 'Product Purchase'
  });

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/payment/create', 
        paymentData
      );
      
      // Handle QR Code or Payment Link
      console.log(response.data);
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  return (
    <div>
      <h2>Mercado Pago Payment</h2>
      <input 
        type="number" 
        value={paymentData.amount}
        onChange={(e) => setPaymentData({
          ...paymentData, 
          amount: parseFloat(e.target.value)
        })}
      />
      <button onClick={handlePayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default PaymentComponent;