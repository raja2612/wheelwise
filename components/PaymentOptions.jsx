import { useState } from 'react';
import '../styles/paymentOptions.css';

export default function PaymentOptions({ amount, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    accountNumber: '',
    ifsc: ''
  });

  const handlePayment = () => {
    // Process payment
    setTimeout(() => {
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h3>Payment Amount: ₹{amount}</h3>
      
      <div className="payment-methods">
        <label>
          <input 
            type="radio" 
            name="paymentMethod" 
            value="upi"
            onChange={() => setPaymentMethod('upi')}
          />
          UPI
        </label>
        
        <label>
          <input 
            type="radio" 
            name="paymentMethod" 
            value="card"
            onChange={() => setPaymentMethod('card')}
          />
          Credit/Debit Card
        </label>
        
        <label>
          <input 
            type="radio" 
            name="paymentMethod" 
            value="netbanking"
            onChange={() => setPaymentMethod('netbanking')}
          />
          Net Banking
        </label>
      </div>

      {paymentMethod === 'upi' && (
        <div className="payment-details">
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={paymentDetails.upiId}
            onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})}
          />
        </div>
      )}

      {paymentMethod === 'card' && (
        <div className="payment-details">
          <input
            type="text"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
          />
          <div className="card-details">
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentDetails.expiry}
              onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})}
            />
            <input
              type="text"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
            />
          </div>
        </div>
      )}

      {paymentMethod === 'netbanking' && (
        <div className="payment-details">
          <input
            type="text"
            placeholder="Account Number"
            value={paymentDetails.accountNumber}
            onChange={(e) => setPaymentDetails({...paymentDetails, accountNumber: e.target.value})}
          />
          <input
            type="text"
            placeholder="IFSC Code"
            value={paymentDetails.ifsc}
            onChange={(e) => setPaymentDetails({...paymentDetails, ifsc: e.target.value})}
          />
        </div>
      )}

      <button 
        className="pay-button"
        onClick={handlePayment}
        disabled={!paymentMethod}
      >
        Pay Now
      </button>
    </div>
  );
}