import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MaintenanceStatus.css';

export default function MaintenanceStatus({ maintenance = [], onPaymentSuccess }) {
  const navigate = useNavigate();
  const [localMaintenance, setLocalMaintenance] = useState(maintenance);

  // Sync with parent component's maintenance data
  useEffect(() => {
    setLocalMaintenance(maintenance);
  }, [maintenance]);

  const handlePayment = (item) => {
    // Update local state optimistically
    setLocalMaintenance(prev => 
      prev.map(m => m.id === item.id ? { ...m, paid: true } : m)
    );
    
    navigate('/payment/maintenance', {
      state: {
        ...item,
        // Don't pass functions in state
      }
    });
  };

  return (
    <div className="maintenance-status">
      <h3>Maintenance Records</h3>
      {localMaintenance.length === 0 ? (
        <p className="no-records">No maintenance records found</p>
      ) : (
        <div className="maintenance-cards">
          {localMaintenance.map((item) => (
            <div key={item.id} className={`maintenance-card ${item.paid ? 'paid' : 'unpaid'}`}>
              <h4>{item.title}</h4>
              <p>Date: {item.date}</p>
              <p>Amount: ₹{item.amount.toLocaleString()}</p>
              <div className="status-badge">
                {item.paid ? 'Paid ✓' : 'Pending Payment'}
              </div>
              {!item.paid && (
                <button onClick={() => handlePayment(item)}>
                  Pay Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}