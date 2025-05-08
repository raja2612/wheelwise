import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/MaintenanceReceipt.css';

export default function MaintenanceReceipt({ onPaymentSuccess }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  // Call the payment success callback when component mounts
  useEffect(() => {
    if (state?.maintenanceId && onPaymentSuccess) {
      onPaymentSuccess(state.maintenanceId);
    }
  }, [state, onPaymentSuccess]);

  if (!state) return null;

  return (
    <div className="maintenance-receipt">
      <div className="receipt-card">
        <h2>Payment Successful</h2>
        <div className="receipt-details">
          <div className="detail-row">
            <span>Maintenance:</span>
            <span>{state.title}</span>
          </div>
          <div className="detail-row">
            <span>Amount Paid:</span>
            <span>₹{state.amount.toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span>Payment Method:</span>
            <span>{state.paymentMethod}</span>
          </div>
          <div className="detail-row">
            <span>Payment Date:</span>
            <span>{new Date(state.paymentDate).toLocaleString()}</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="home-button"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}