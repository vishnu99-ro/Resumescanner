document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const pickupLocation = document.getElementById('pickup').value;
    const dropoffLocation = document.getElementById('dropoff').value;
    const rideType = document.getElementById('ride-type').value;

    // Send the booking request to the backend API
    fetch('http://localhost:5000/api/book-ride', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pickupLocation: pickupLocation,
            dropoffLocation: dropoffLocation,
            rideType: rideType,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.booking) {
            // Show success message
            document.getElementById('fare').textContent = `₹${data.booking.fare}`;
            document.getElementById('booking-result').textContent = `Ride booked! Estimated fare is ₹${data.booking.fare}.`;
        } else {
            document.getElementById('booking-result').textContent = 'Failed to book ride.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('booking-result').textContent = 'Failed to book ride.';
    });
});

// Add event listener for the "Use Current Location" button
document.getElementById('get-location').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Convert latitude and longitude to a readable address (optional)
            const apiKey = 'YOUR_MAPS_API_KEY'; // Replace with your Google Maps API key or any other geocoding service
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

            fetch(geocodeUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        // Set the pickup location to the address returned
                        document.getElementById('pickup').value = data.results[0].formatted_address;
                    } else {
                        alert('Could not get address from location. Please enter manually.');
                    }
                })
                .catch(err => console.error(err));
        }, function() {
            alert('Unable to retrieve your location. Please check your settings.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
