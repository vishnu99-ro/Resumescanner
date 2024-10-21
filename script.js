document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const pickupLocation = document.getElementById('pickup').value;
    const dropoffLocation = document.getElementById('dropoff').value;
    const rideType = document.getElementById('ride-type').value;

    // Simple fare estimation logic
    const fare = calculateFare(pickupLocation, dropoffLocation, rideType);
    document.getElementById('fare').textContent = `₹${fare}`;

    // Simulate booking
    document.getElementById('booking-result').textContent = `Your ${rideType === 'bike' ? 'Bike Taxi' : 'Auto-Rickshaw'} ride from ${pickupLocation} to ${dropoffLocation} has been booked! Estimated fare is ₹${fare}.`;
});

function calculateFare(pickup, dropoff, rideType) {
    // Simulate fare calculation based on ride type
    const baseFare = rideType === 'bike' ? 20 : 40; // Base fare for bike taxi or auto-rickshaw
    const distanceFactor = 10; // Simulate distance-based fare calculation (₹10 per unit distance)
    
    // For simplicity, assuming a fixed distance for this example (in a real app, you'd calculate based on pickup/dropoff locations)
    const distance = 5; // Assume a fixed distance of 5 units

    const totalFare = baseFare + (distance * distanceFactor);
    return totalFare;
}
