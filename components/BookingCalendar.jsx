import { useState, useEffect } from 'react';
import '../styles/BookingCalendar.css';

export default function BookingCalendar({ carId, bookings = [], setBookings }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState('');

  // Default bookings by others (only used if no bookings exist)
  const DEFAULT_BOOKED_BY_OTHERS = [
    { date: getDateString(1), status: 'others', emoji: '👨' },
    { date: getDateString(4), status: 'others', emoji: '👩' },
    { date: getDateString(8), status: 'others', emoji: '👨' }
  ];

  function getDateString(daysFromToday) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return date.toISOString().split('T')[0];
  }

  // Combine user bookings with default others (only for dates not already booked)
  const allBookings = [
    ...bookings,
    ...DEFAULT_BOOKED_BY_OTHERS.filter(
      defaultBooking => !bookings.some(b => b.date === defaultBooking.date)
    )
  ];

  const handleDateClick = (date) => {
    const existingBooking = allBookings.find(b => b.date === date);
    if (!existingBooking || existingBooking.status === 'available') {
      setSelectedDate(date);
    }
  };

  const confirmBooking = () => {
    const newBooking = {
      date: selectedDate,
      status: 'mine',
      reason,
      emoji: '😊'
    };

    // Update parent component's state
    setBookings([
      ...bookings.filter(b => b.date !== selectedDate),
      newBooking
    ]);

    setSelectedDate(null);
    setReason('');
  };

  return (
    <div className="booking-calendar">
      <h3>Available Dates</h3>
      <div className="dates-grid">
        {Array.from({ length: 15 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const dateStr = date.toISOString().split('T')[0];
          const booking = allBookings.find(b => b.date === dateStr);
          const status = booking?.status || 'available';

          return (
            <div
              key={dateStr}
              className={`date-box ${status}`}
              onClick={() => handleDateClick(dateStr)}
            >
              {date.getDate()}
              {booking?.emoji || ''}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="booking-modal">
          <h4>Book {selectedDate}</h4>
          <input
            type="text"
            placeholder="Reason (optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="modal-buttons">
            <button onClick={confirmBooking}>Confirm</button>
            <button onClick={() => setSelectedDate(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}