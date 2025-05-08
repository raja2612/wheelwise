import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../styles/PaymentPage.css';

export default function PaymentPage() {
  const { id } = useParams();
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

  // Calculate total amount safely
  const calculateTotal = () => {
    if (!state?.car?.price || !state?.tokens) return 0;
    return (state.tokens * (state.car.price / 12));
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Prepare complete data for receipt
    const purchaseData = {
      ...state,
      paymentMethod,
      paymentDetails,
      totalAmount: (state.car.price * state.tokens / 12).toLocaleString()
    };
  
    navigate(`/receipt/${id}`, { state: purchaseData });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  // Show loading if state isn't ready yet
// Add this check at the start of your component
if (!state?.car) {
  return (
    <div className="payment-error">
      <h2>Missing Car Information</h2>
      <p>Please go back and complete your purchase form again.</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

// Then safely use state.car in your calculations
const pricePerToken = state.car.price / 12;
const totalAmount = state.tokens * pricePerToken;

  return (
    <div className="payment-page">
      <h2>Payment</h2>
      <div className="payment-card">
        <div className="payment-summary">
          <h3>{state.car.model || 'Car Purchase'}</h3>
          <div className="amount-display">
            Total Amount: ₹{calculateTotal().toLocaleString()}
          </div>
          <div className="token-info">
            Purchasing {state.tokens || 1} token(s) at ₹{(state.car.price ? (state.car.price/12) : 0).toLocaleString()} per token
          </div>
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
    </div>
  );
}