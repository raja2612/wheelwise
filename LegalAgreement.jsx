import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/LegalAgreement.css';

export default function LegalAgreement() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleAgreement = () => {
    // In a real app, you would save this to your database/state
    navigate('/');
  };

  return (
    <div className="legal-agreement-page">
      <div className="agreement-card">
        <h2>Fractional Ownership Agreement</h2>
        <div className="agreement-content">
          <p>By proceeding, you agree to the following terms and conditions of fractional ownership:</p>
          
          <h3>Ownership Structure</h3>
          <ol>
            <li>You are purchasing {state?.tokens || 'X'} tokens representing a fractional share of the vehicle</li>
            <li>Tokens may be sold back to WheelWise at current market value, subject to a 5% transaction fee</li>
            <li>Ownership tokens may be transferred to other users after 6 months of ownership</li>
          </ol>

          <h3>Usage Terms</h3>
          <ol start="4">
            <li>Booked dates cannot be modified within 72 hours of reservation</li>
            <li>Vehicle must be returned with at least 1/4 tank of fuel</li>
            <li>Smoking or transporting pets in the vehicle is strictly prohibited</li>
            <li>No illegal activities may be conducted using the vehicle</li>
          </ol>

          <h3>Financial Obligations</h3>
          <ol start="8">
            <li>Annual maintenance fee of ₹15,000 per token must be paid by January 31st each year</li>
            <li>Late maintenance payments incur 1.5% monthly interest</li>
            <li>Major damages (exceeding ₹25,000) caused during your booking period will result in:
              <ul>
                <li>100% of first ₹25,000 covered by insurance</li>
                <li>50% of remaining costs up to ₹1,00,000</li>
                <li>20% of costs beyond ₹1,00,000</li>
              </ul>
            </li>
          </ol>

          <h3>Privacy & Communication</h3>
          <ol start="11">
            <li>Your name, verified phone number, and profile photo will be visible to other co-owners</li>
            <li>All owners will be added to a shared communication channel for vehicle updates</li>
            <li>You consent to receive SMS/email notifications about vehicle status</li>
          </ol>

          <h3>General Provisions</h3>
          <ol start="14">
            <li>WheelWise reserves right to suspend accounts for repeated violations</li>
            <li>Disputes will be resolved through binding arbitration in Mumbai</li>
            <li>This agreement is governed by Indian contract law</li>
          </ol>

          <div className="important-note">
            <h4>Important Notice:</h4>
            <p>Fractional ownership does not confer exclusive rights to the vehicle. All usage must be scheduled through the WheelWise platform. You are jointly liable for any illegal activities conducted with the vehicle during your booked periods.</p>
          </div>
        </div>

        <div className="agreement-checkbox">
          <input 
            type="checkbox" 
            id="agree" 
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="agree">
            I have read and agree to all terms and conditions of this fractional ownership agreement
          </label>
        </div>

        <button 
          onClick={handleAgreement}
          disabled={!agreed}
          className="agree-button"
        >
          Accept & Confirm Ownership
        </button>
      </div>
    </div>
  );
}