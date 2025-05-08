import { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import '../styles/home.css';

// Default cars data
const DEFAULT_CARS = [
  {
    id: 1,
    model: "Toyota Camry",
    image: "/images/BMW1.jpeg",
    year: 2022,
    price: 2400000,
    tokensOwned: 2,
    availableDays: 60,
    owners: [
      { id: 1, name: "You", tokens: 2, image: "/users/user1.jpg" },
      { id: 2, name: "Alex Johnson", tokens: 3, image: "/users/user2.jpg" },
      { id: 3, name: "Sarah Miller", tokens: 1, image: "/users/user3.jpg" }
    ],
    maintenance: [
      { id: 1, title: "Oil Change", date: "2023-10-15", amount: 5000, paid: true },
      { id: 2, title: "Tire Rotation", date: "2023-09-01", amount: 3000, paid: true },
      { id: 3, title: "Brake Inspection", date: "2023-11-20", amount: 0, paid: false }
    ],
    bookings: [
      { date: "2023-12-05", status: "mine", reason: "Weekend trip", emoji: "😊" },
      { date: "2023-12-12", status: "others", emoji: "👨" },
      { date: "2023-12-18", status: "others", emoji: "👩" }
    ]
  },
  {
    id: 2,
    model: "Honda Civic",
    image: "/images/BMW2.jpg",
    year: 2021,
    price: 1800000,
    tokensOwned: 1,
    availableDays: 30,
    owners: [
      { id: 1, name: "You", tokens: 1, image: "/users/user1.jpg" },
      { id: 4, name: "Michael Chen", tokens: 2, image: "/users/user4.jpg" },
      { id: 5, name: "Emma Wilson", tokens: 3, image: "/users/user5.jpg" }
    ],
    maintenance: [
      { id: 1, title: "Battery Replacement", date: "2023-08-10", amount: 12000, paid: true },
      { id: 2, title: "AC Service", date: "2023-11-05", amount: 7500, paid: true }
    ],
    bookings: [
      { date: "2023-12-03", status: "mine", reason: "Date night", emoji: "😊" },
      { date: "2023-12-08", status: "others", emoji: "👨" },
      { date: "2023-12-15", status: "others", emoji: "👩" },
      { date: "2023-12-22", status: "others", emoji: "👴" }
    ]
  },
  {
    id: 101,
    model: "Tesla Model 3",
    image: "/cars/tesla.jpg",
    year: 2023,
    price: 5500000,
    tokensAvailable: 8,
    owners: [
      { id: 6, name: "David Kim", tokens: 3, image: "/users/user6.jpg" },
      { id: 7, name: "Priya Patel", tokens: 2, image: "/users/user7.jpg" },
      { id: 8, name: "James Rodriguez", tokens: 3, image: "/users/user8.jpg" }
    ],
    maintenance: [
      { id: 1, title: "Tire Pressure Check", date: "2023-10-01", amount: 0, paid: true },
      { id: 2, title: "Software Update", date: "2023-11-15", amount: 0, paid: true }
    ],
    bookings: [
      { date: "2023-12-01", status: "others", emoji: "👩" },
      { date: "2023-12-07", status: "others", emoji: "👨" },
      { date: "2023-12-14", status: "mine", reason: "Business trip", emoji: "😊" },
      { date: "2023-12-21", status: "others", emoji: "👵" }
    ]
  },
  {
    id: 102,
    model: "BMW X5",
    image: "/cars/bmw.jpg",
    year: 2023,
    price: 7800000,
    tokensAvailable: 5,
    owners: [
      { id: 9, name: "Olivia Smith", tokens: 2, image: "/users/user9.jpg" },
      { id: 10, name: "Robert Taylor", tokens: 3, image: "/users/user10.jpg" }
    ],
    maintenance: [
      { id: 1, title: "Engine Diagnostics", date: "2023-09-20", amount: 15000, paid: true },
      { id: 2, title: "Premium Detailing", date: "2023-11-10", amount: 8000, paid: true }
    ],
    bookings: [
      { date: "2023-12-02", status: "others", emoji: "👨" },
      { date: "2023-12-09", status: "mine", reason: "Anniversary", emoji: "😊" },
      { date: "2023-12-16", status: "others", emoji: "👩" }
    ]
  },
  {
    id: 103,
    model: "Audi Q7",
    image: "/cars/audi.jpg",
    year: 2023,
    price: 8500000,
    tokensAvailable: 3,
    owners: [
      { id: 11, name: "Sophia Garcia", tokens: 1, image: "/users/user11.jpg" },
      { id: 12, name: "Daniel Brown", tokens: 2, image: "/users/user12.jpg" }
    ],
    maintenance: [
      { id: 1, title: "Oil Change", date: "2023-10-05", amount: 9000, paid: true },
      { id: 2, title: "Wheel Alignment", date: "2023-11-25", amount: 6500, paid: false }
    ],
    bookings: [
      { date: "2023-12-04", status: "others", emoji: "👩" },
      { date: "2023-12-11", status: "mine", reason: "Family visit", emoji: "😊" },
      { date: "2023-12-17", status: "others", emoji: "👨" },
      { date: "2023-12-24", status: "others", emoji: "👵" }
    ]
  }
];

export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const loadCarsData = () => {
      const savedData = localStorage.getItem('wheelwise-cars');
      return savedData ? JSON.parse(savedData) : [];
    };

    setCars(loadCarsData());

    const handleStorageChange = () => {
      setCars(loadCarsData());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const [maintenanceItems, setMaintenanceItems] = useState([]);

const handlePaymentSuccess = (id) => {
  setMaintenanceItems(prev => 
    prev.map(item => 
      item.id === id ? { ...item, paid: true } : item
    )
  );
}


  return (
    <div className="home-page">
      <section className="owned-cars">
        <h2>Your Fractional Ownerships</h2>
  {cars.length === 0 ? (
  <div className="no-cars-full">
    <div className="no-cars-message">
      <h2>You don't own any cars yet</h2>
      <p>Explore the market to get started!</p>
    </div>
    <img src="/homepage.jpg" alt="No Cars" className="no-cars-image" />
  </div>
) : (
  <div className="car-cards-container">
    {cars.map(car => (
      <CarCard key={car.id} car={car} />
    ))}
  </div>
)}

      </section>
    </div>
  );
}
