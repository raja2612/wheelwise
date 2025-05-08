import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../styles/PurchaseForm.css';

export default function PurchaseForm() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: '',
    address: '',
    address2: '',
    tokens: 1,
    photo: null,
    aadhaar: null,
    license: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!state?.car) {
      alert('Car information is missing. Please go back and try again.');
      return;
    }

    if (!formData.name || !formData.age || !formData.occupation || !formData.address) {
      alert('Please fill all required personal information fields');
      return;
    }

    if (!formData.photo || !formData.aadhaar || !formData.license) {
      alert('Please upload all required documents');
      return;
    }

    // Prepare complete car data with all details
    const completeCarData = {
      ...state.car,
      // Ensure all fields exist with defaults
      owners: state.car.owners || [],
      maintenance: state.car.maintenance || [],
      bookings: state.car.bookings || [],
      year: state.car.year || new Date().getFullYear()
    };

    // Navigate to payment with all data
    navigate(`/payment/${id}`, {
      state: {
        ...formData,
        car: completeCarData,
        tokens: formData.tokens,
        pricePerToken: completeCarData.price / 12,
        totalAmount: (completeCarData.price / 12) * formData.tokens
      }
    });
  };

  // Show loading if car data isn't available yet
  if (!state?.car) {
    return <div className="loading">Loading car details...</div>;
  }

  return (
    <div className="purchase-form-page">
      <form onSubmit={handleSubmit}>
        <h2>Purchase Form - {state.car.model}</h2>
        
        <div className="form-group">
          <label>Full Name</label>
          <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Age</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            required 
            min="18"
          />
        </div>

        <div className="form-group">
          <label>Occupation</label>
          <input 
            name="occupation" 
            value={formData.occupation} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Address Line 2</label>
          <input 
            name="address2" 
            value={formData.address2} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group tokens-slider">
          <label>Tokens to Buy (1-4)</label>
          <input 
            type="range" 
            name="tokens" 
            min="1" 
            max="4" 
            value={formData.tokens}
            onChange={handleChange}
          />
          <div className="token-info">
            <span>{formData.tokens} token(s)</span>
            <span className="token-price">
              ₹{((state.car.price / 12) * formData.tokens).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Photo</label>
          <input 
            type="file" 
            name="photo" 
            onChange={handleFileChange} 
            accept="image/*"
            required 
          />
        </div>

        <div className="form-group">
          <label>Aadhaar Card</label>
          <input 
            type="file" 
            name="aadhaar" 
            onChange={handleFileChange} 
            accept="image/*,.pdf"
            required 
          />
        </div>

        <div className="form-group">
          <label>Driving License</label>
          <input 
            type="file" 
            name="license" 
            onChange={handleFileChange} 
            accept="image/*,.pdf"
            required 
          />
        </div>

        <button type="submit" className="submit-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}