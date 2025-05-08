import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/MaintenancePayment.css';

export default function MaintenancePayment({ onPaymentSuccess }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    accountNumber: '',
    ifsc: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Call the success handler with maintenance ID
      if (onPaymentSuccess && state?.id) {
        onPaymentSuccess(state.id);
      }
      
      navigate('/maintenance-receipt', {
        state: {
          ...state,
          paymentMethod,
          paymentDetails,
          paymentDate: new Date().toISOString()
        }
      });
    }, 1500);
  };

  if (!state) {
    return (
      <div className="payment-error">
        <h2>Missing Payment Details</h2>
        <p>Please initiate payment from the maintenance page</p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="maintenance-payment">
      <h2>Maintenance Payment</h2>
      <div className="payment-details">
        <p>Description: {state.title}</p>
        <p>Amount: ₹{state.amount.toLocaleString()}</p>
        <p>Due Date: {new Date(state.date).toLocaleDateString()}</p>
      </div>
      
      <div className="payment-methods">
        <div 
          className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}
          onClick={() => setPaymentMethod('upi')}
        >
          <img src="/payment/UPI.png" alt="UPI" className="method-icon" />
          <span>UPI Payment</span>
          {paymentMethod === 'upi' && (
            <div className="method-details">
              <input
                type="text"
                name="upiId"
                placeholder="Enter UPI ID"
                value={paymentDetails.upiId}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
        </div>

        <div 
          className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
          onClick={() => setPaymentMethod('card')}
        >
          <img src="/payment/credit.jpg" alt="Credit Card" className="method-icon" />
          <span>Credit/Debit Card</span>
          {paymentMethod === 'card' && (
            <div className="method-details">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                required
              />
              <div className="card-row">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={paymentDetails.expiry}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div 
          className={`method-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
          onClick={() => setPaymentMethod('netbanking')}
        >
          <img src="/payment/netbanking.png" alt="Net Banking" className="method-icon" />
          <span>Net Banking</span>
          {paymentMethod === 'netbanking' && (
            <div className="method-details">
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={paymentDetails.accountNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="ifsc"
                placeholder="IFSC Code"
                value={paymentDetails.ifsc}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={handlePayment}
        disabled={!paymentMethod || isProcessing}
        className="pay-button"
      >
        {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
      </button>
    </div>
  );
}