import { useState } from 'react';
import '../styles/OwnerDetails.css';

export default function OwnerDetails({ owners, onAddOwner }) {
  const [newOwner, setNewOwner] = useState({
    name: '',
    tokens: 1,
    image: '/users/default.jpg'
  });

  const handleAdd = () => {
    if (newOwner.name) {
      onAddOwner({
        ...newOwner,
        id: Date.now() // Simple unique ID
      });
      setNewOwner({
        name: '',
        tokens: 1,
        image: '/users/default.jpg'
      });
    }
  };

  return (
    <div className="owner-details">
      <h3>Owners</h3>
      <div className="owners-grid">
        {owners.map(owner => (
          <div key={owner.id} className="owner-card">
            <img src={owner.image} alt={owner.name} className="owner-image" />
            <div className="owner-info">
              <h4>{owner.name}</h4>
              <p>Tokens: {owner.tokens}/12</p>
              <p>Days: {owner.tokens * 30}/365</p>
            </div>
          </div>
        ))}
      </div>

      <div className="add-owner-form">
        <h4>Add New Owner</h4>
        <input
          type="text"
          placeholder="Name"
          value={newOwner.name}
          onChange={(e) => setNewOwner({...newOwner, name: e.target.value})}
        />
        <input
          type="number"
          min="1"
          max="4"
          value={newOwner.tokens}
          onChange={(e) => setNewOwner({...newOwner, tokens: parseInt(e.target.value) || 1})}
        />
        <button onClick={handleAdd}>Add Owner</button>
      </div>
    </div>
  );
}