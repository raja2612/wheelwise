import '../styles/OwnerDetails.css';

export default function OwnerDetails({ owners }) {
  return (
    <div className="owner-details">
      <h3>Owners</h3>
      <div className="owners-grid">
        {owners.map((owner, index) => (
          <div key={index} className="owner-card">
            <img src={owner.image} alt={owner.name} className="owner-image" />
            <div className="owner-info">
              <h4>{owner.name}</h4>
              <p>Tokens: {owner.tokens}/12</p>
              <p>Days: {owner.tokens * 30}/365</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}