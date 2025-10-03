// Vehicle Reservation System JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables and elements
    const form = document.getElementById('reservation-form');
    const destinationSelect = document.getElementById('destination');
    const otherDestinationGroup = document.getElementById('other-destination-group');
    const vehicleTypeSelect = document.getElementById('vehicle-type');
    const vehiclePreviewImage = document.getElementById('vehicle-preview-image');
    const vehicleDetails = document.getElementById('vehicle-details');
    const modal = document.getElementById('confirmation-modal');
    const confirmationDetails = document.getElementById('confirmation-details');
    const confirmButton = document.getElementById('confirm-reservation');
    const editButton = document.getElementById('edit-reservation');
    const closeModal = document.querySelector('.close-modal');
    const faqItems = document.querySelectorAll('.faq-item');

    // Vehicle data with images
    const vehicles = {
        car: {
            image: "images/car.jpg",
            description: "Comfortable sedan with AC (1-4 passengers)",
            basePrice: 25
        },
        van: {
            image: "images/van.jpg",
            description: "Spacious van with AC (1-8 passengers)",
            basePrice: 40
        },
        suv: {
            image: "images/suv.jpg",
            description: "Luxury SUV with AC (1-6 passengers)",
            basePrice: 60
        },
        bus: {
            image: "images/bus.jpg",
            description: "Comfortable bus with AC (10-30 passengers)",
            basePrice: 100
        }
    };

    // Destination distances from airport (in km)
    const destinations = {
        colombo: 35,
        kandy: 115,
        galle: 150,
        negombo: 10,
        ella: 230
    };

    // Show/hide other destination field based on selection
    destinationSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            otherDestinationGroup.style.display = 'block';
        } else {
            otherDestinationGroup.style.display = 'none';
        }
    });

    // Update vehicle preview when vehicle type changes
    vehicleTypeSelect.addEventListener('change', function() {
        const selectedVehicle = vehicles[this.value];
        
        if (selectedVehicle) {
            // Set fallback image if the actual image doesn't exist
            vehiclePreviewImage.src = selectedVehicle.image;
            vehiclePreviewImage.onerror = function() {
                this.src = 'images/default-vehicle.jpg';
            };
            
            vehicleDetails.innerHTML = `
                <h4>${selectedVehicle.name}</h4>
                <p>${selectedVehicle.details}</p>
            `;
        } else {
            vehiclePreviewImage.src = 'images/default-vehicle.jpg';
            vehicleDetails.innerHTML = '<p>Please select a vehicle type to see details</p>';
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const pickupDate = document.getElementById('pickup-date').value;
        const pickupTime = document.getElementById('pickup-time').value;
        const passengers = document.getElementById('passengers').value;
        let destination = document.getElementById('destination').value;
        
        if (destination === 'other') {
            destination = document.getElementById('other-destination').value;
        }
        
        const vehicleType = document.getElementById('vehicle-type').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const specialRequests = document.getElementById('special-requests').value;
        
        // Calculate estimated price
        let estimatedPrice = 0;
        if (destinations[destination]) {
            estimatedPrice = calculatePrice(destination, vehicleType);
        } else {
            // Default price for custom destinations
            estimatedPrice = vehicles[vehicleType] ? vehicles[vehicleType].pricePerKm * 50 : 50;
        }
        
        // Display confirmation details
        confirmationDetails.innerHTML = `
            <div class="confirmation-item">
                <h3>Reservation Details</h3>
                <p><strong>Pickup Date:</strong> ${formatDate(pickupDate)}</p>
                <p><strong>Pickup Time:</strong> ${formatTime(pickupTime)}</p>
                <p><strong>Number of Passengers:</strong> ${passengers}</p>
                <p><strong>Destination:</strong> ${destination.charAt(0).toUpperCase() + destination.slice(1)}</p>
                <p><strong>Vehicle Type:</strong> ${vehicles[vehicleType] ? vehicles[vehicleType].name : vehicleType}</p>
                <p><strong>Estimated Price:</strong> $${estimatedPrice.toFixed(2)}</p>
            </div>
            <div class="confirmation-item">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                ${specialRequests ? `<p><strong>Special Requests:</strong> ${specialRequests}</p>` : ''}
            </div>
        `;
        
        // Show modal
        modal.style.display = 'flex';
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle confirm button click
    confirmButton.addEventListener('click', function() {
        // Here you would typically send the data to a server
        // For this demo, we'll just show an alert
        alert('Reservation confirmed! A confirmation email has been sent to your email address.');
        modal.style.display = 'none';
        form.reset();
    });

    // Handle edit button click
    editButton.addEventListener('click', function() {
        modal.style.display = 'none';
        // Focus on the first form field for editing
        document.getElementById('pickup-date').focus();
    });

    // FAQ accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Helper function to calculate price based on destination and vehicle type
    function calculatePrice(destination, vehicleType) {
        if (!destinations[destination] || !vehicles[vehicleType]) {
            return 0;
        }
        
        const distance = destinations[destination];
        const pricePerKm = vehicles[vehicleType].pricePerKm;
        
        return distance * pricePerKm;
    }

    // Helper function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Helper function to format time
    function formatTime(timeString) {
        const options = { hour: '2-digit', minute: '2-digit' };
        const date = new Date();
        const [hours, minutes] = timeString.split(':');
        date.setHours(hours);
        date.setMinutes(minutes);
        return date.toLocaleTimeString(undefined, options);
    }

    // Set minimum date for pickup to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${yyyy}-${mm}-${dd}`;
    document.getElementById('pickup-date').min = formattedToday;

    // Create images directory structure notice
    const imagesNotice = document.createElement('div');
    imagesNotice.className = 'images-folder-notice';
    imagesNotice.innerHTML = `
        <p>Note: This system requires an "images" folder with the following images:</p>
        <ul>
            <li>logo.png - Sri Lanka Airport logo</li>
            <li>sri-lanka-airport.jpg - Hero background image</li>
            <li>car.jpg - Car image</li>
            <li>van.jpg - Van image</li>
            <li>minibus.jpg - Minibus image</li>
            <li>bus.jpg - Bus image</li>
            <li>default-vehicle.jpg - Default vehicle image</li>
            <li>colombo.jpg, kandy.jpg, galle.jpg, ella.jpg - Destination images</li>
            <li>testimonial1.jpg, testimonial2.jpg, testimonial3.jpg - Testimonial profile images</li>
        </ul>
    `;
    document.body.appendChild(imagesNotice);

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert(`Thank you for subscribing to our newsletter with email: ${emailInput.value}`);
                emailInput.value = '';
            }
        });
    }
});