import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';
import OwnerDetails from '../components/OwnerDetails';
import MaintenanceStatus from '../components/MaintenanceStatus';
import '../styles/CarDetails.css';

// Default data structure
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
      { id: 2, title: "AC Service", date: "2023-11-05", amount: 7500, paid: false }
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

// Default bookings by others
const DEFAULT_BOOKED_BY_OTHERS = [
  { date: '2023-10-16', status: 'others', emoji: '👨' },
  { date: '2023-10-19', status: 'others', emoji: '👩' }
];

export default function CarDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('booking');
  const [car, setCar] = useState(null);

  // Load car data with proper defaults
  useEffect(() => {
    const loadCarData = () => {
      const savedData = localStorage.getItem('wheelwise-cars');
      if (savedData) {
        const cars = JSON.parse(savedData);
        const foundCar = cars.find(c => c.id === parseInt(id));
        
        // Ensure all required fields exist with defaults
        return foundCar ? {
          id: foundCar.id,
          model: foundCar.model || 'Unknown Model',
          image: foundCar.image || '/images/default-car.jpg',
          year: foundCar.year || new Date().getFullYear(),
          price: foundCar.price || 0,
          tokensOwned: foundCar.tokensOwned || 0,
          availableDays: foundCar.availableDays || 0,
          owners: foundCar.owners || [],
          maintenance: foundCar.maintenance || [],
          bookings: foundCar.bookings || []
        } : null;
      }
      return null;
    };
    
    setCar(loadCarData());
  }, [id]);

  // Handle booking updates
  const handleBookingUpdate = (updatedBookings) => {
    // Update local state
    setCar(prev => ({
      ...prev,
      bookings: updatedBookings
    }));
    
    // Update localStorage
    const savedData = localStorage.getItem('wheelwise-cars');
    if (savedData) {
      const cars = JSON.parse(savedData);
      const updatedCars = cars.map(c => 
        c.id === car.id ? { ...c, bookings: updatedBookings } : c
      );
      localStorage.setItem('wheelwise-cars', JSON.stringify(updatedCars));
    }
  };

  // Handle maintenance payment
  const handleMaintenancePayment = (maintenanceId) => {
    setCar(prev => ({
      ...prev,
      maintenance: prev.maintenance.map(item => 
        item.id === maintenanceId ? { ...item, paid: true } : item
      )
    }));
  };

  // Handle adding new owner
  const handleAddOwner = (newOwner) => {
    setCar(prev => ({
      ...prev,
      owners: [...prev.owners, newOwner],
      tokensOwned: prev.tokensOwned + newOwner.tokens
    }));
  };

  if (!car) return <div className="loading">Loading car details...</div>;

  return (
    <div className="car-details-page">
      <div className="car-header">
        <img src={car.image} alt={car.model} className="car-main-image" />
        <div className="car-info">
          <h1>{car.model} ({car.year})</h1>
          <p>Your Tokens: {Math.floor(car.tokensOwned/10)}/12</p>
          <p>Available Days: {car.availableDays}/365</p>
          <p>Current Value: ₹{(car.price * car.tokensOwned/12).toLocaleString()}</p>
        </div>
      </div>

      <div className="details-tabs">
        <button 
          className={`tab-button ${activeTab === 'booking' ? 'active' : ''}`}
          onClick={() => setActiveTab('booking')}
        >
          Booking Calendar
        </button>
        <button 
          className={`tab-button ${activeTab === 'owners' ? 'active' : ''}`}
          onClick={() => setActiveTab('owners')}
        >
          Owners ({car.owners.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          Maintenance ({car.maintenance.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'booking' && (
          <BookingCalendar 
            carId={car.id}
            bookings={car.bookings}
            setBookings={handleBookingUpdate}
          />
        )}
        
        {activeTab === 'owners' && (
          <OwnerDetails 
            owners={car.owners}
            onAddOwner={handleAddOwner}
          />
        )}
        
        {activeTab === 'maintenance' && (
          <MaintenanceStatus 
            maintenance={car.maintenance}
            onPayment={handleMaintenancePayment}
          />
        )}
      </div>
    </div>
  );
}