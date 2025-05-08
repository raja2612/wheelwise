import { useNavigate } from 'react-router-dom';
import '../styles/CarCard.css';

export default function CarCard({ car, onUpdate }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/car/${car.id}`);
  };

  const handleAddToken = (e) => {
    e.stopPropagation();
    onUpdate(car.id, { tokensOwned: car.tokensOwned + 1 });
  };

  return (
    <div className="car-card" onClick={handleCardClick}>
      <img src={car.image} alt={car.model} className="car-image" />
      <div className="car-info">
        <h3>{car.model}</h3>
        <p>Tokens: {car.tokensOwned}/12</p>
        <p>Days: {car.availableDays}/365</p>
        <p>Value: ₹{(car.price * car.tokensOwned/12).toLocaleString()}</p>
      </div>
    </div>
  );
}