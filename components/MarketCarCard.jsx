import '../styles/MarketCarCard.css';

export default function MarketCarCard({ car, onClick }) {
  return (
    <div className="market-car-card" onClick={onClick}>
      <img src={car.image} alt={car.model} className="market-car-image" />
      <div className="market-car-info">
        <h3>{car.model}</h3>
        <p>Total Value: ₹{car.price.toLocaleString()}</p>
        <p>Tokens Available: {car.tokensAvailable}/12</p>
        <p>Price Per Token: ₹{(car.price/12).toLocaleString()}</p>
        <button className="buy-button">View Details</button>
      </div>
    </div>
  );
}