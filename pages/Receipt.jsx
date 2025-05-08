import { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Receipt.css';

export default function Receipt({ setOwnedCars }) {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const formatPaymentMethod = (method) => {
    switch (method) {
      case 'upi': return 'UPI Payment';
      case 'card': return 'Credit/Debit Card';
      case 'netbanking': return 'Net Banking';
      default: return method || 'Not specified';
    }
  };

  const receiptDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    if (!state?.car) return;

    const newOwner = {
      id: Date.now(),
      name: state.name || 'You',
      tokens: state.tokens,
      image: "/users/default-user.jpg"
    };

    const newCar = {
      ...state.car,
      tokensOwned: state.tokens,
      availableDays: state.tokens * 30,
      owners: [
        ...(state.car.owners || []),
        newOwner
      ],
      maintenance: state.car.maintenance || [],
      bookings: state.car.bookings || []
    };

    // Update React state
    if (typeof setOwnedCars === 'function') {
      setOwnedCars(prev => [...prev, newCar]);
    }

    // Update localStorage
    const existingCars = JSON.parse(localStorage.getItem('wheelwise-cars') || '[]');
    const existingCarIndex = existingCars.findIndex(c => c.id === newCar.id);

    if (existingCarIndex >= 0) {
      // Update tokens and owners
      existingCars[existingCarIndex].tokensOwned += newCar.tokensOwned;
      existingCars[existingCarIndex].availableDays += newCar.availableDays;
      existingCars[existingCarIndex].owners.push(newOwner);
    } else {
      existingCars.push(newCar);
    }

    localStorage.setItem('wheelwise-cars', JSON.stringify(existingCars));

    // Redirect to Agreement page
    const timer = setTimeout(() => {
      navigate(`/agreement/${id}`, { state: newCar });
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, state, navigate, setOwnedCars]);

  if (!state || !state.car) {
    return (
      <div className="receipt-container">
        <div className="error-message">
          <h2>Purchase Information Missing</h2>
          <p>We couldn't retrieve your purchase details. Please try again.</p>
          <button className="back-button" onClick={() => navigate('/marketplace')}>
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="receipt-container">
      <div className="receipt-card">
        <div className="receipt-header">
          <svg className="success-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
          </svg>
          <h2>Purchase Successful!</h2>
          <p className="receipt-subtitle">Your transaction has been completed</p>
          <div className="receipt-id">Receipt #: {Math.floor(Math.random() * 1000000)}</div>
        </div>

        <div className="receipt-details">
          <div className="detail-section">
            <h3>Purchase Summary</h3>
            <div className="detail-row">
              <span>Car Model:</span>
              <span>{state.car.model || 'Not specified'}</span>
            </div>
            <div className="detail-row">
              <span>Tokens Purchased:</span>
              <span>{state.tokens || 0} token(s)</span>
            </div>
            <div className="detail-row">
              <span>Price Per Token:</span>
              <span>₹{state.car.price ? (state.car.price / 12).toLocaleString() : 'N/A'}</span>
            </div>
            <div className="detail-row total-row">
              <span>Total Amount:</span>
              <span>₹{state.car.price ? (state.tokens * (state.car.price / 12)).toLocaleString() : 'N/A'}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Payment Information</h3>
            <div className="detail-row">
              <span>Payment Method:</span>
              <span>{formatPaymentMethod(state.paymentMethod)}</span>
            </div>
            {state.paymentMethod === 'card' && state.paymentDetails?.cardNumber && (
              <div className="detail-row">
                <span>Card Ending:</span>
                <span>•••• {state.paymentDetails.cardNumber.slice(-4)}</span>
              </div>
            )}
            <div className="detail-row">
              <span>Date & Time:</span>
              <span>{receiptDate} at {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Customer Information</h3>
            <div className="detail-row">
              <span>Name:</span>
              <span>{state.name || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span>Tokens Owned:</span>
              <span>{state.tokens || 0}/12</span>
            </div>
          </div>
        </div>

        <div className="processing-message">
          <div className="loading-spinner"></div>
          <p>Preparing your ownership documents...</p>
          <p className="redirect-text">You'll be redirected automatically in 5 seconds</p>
        </div>
      </div>
    </div>
  );
}
