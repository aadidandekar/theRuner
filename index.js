function redirectToGoogleMaps() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const distanceInput = document.getElementById('distance').value;
            const direction = document.getElementById('direction').value;
            const distance = Number(distanceInput) / 2;  // Half the distance in km

            // Choose a random direction if "Surprise me" is selected
            const directions = ['north', 'south', 'east', 'west'];
            const selectedDirection = direction === 'surprise' ? directions[Math.floor(Math.random() * directions.length)] : direction;

            // Calculate the destination coordinates
            const earthRadius = 6371; // Radius of the Earth in km
            let newLat = lat;
            let newLng = lng;

            switch (selectedDirection) {
                case 'north':
                    newLat = lat + (distance / earthRadius) * (180 / Math.PI);
                    break;
                case 'south':
                    newLat = lat - (distance / earthRadius) * (180 / Math.PI);
                    break;
                case 'east':
                    newLng = lng + (distance / earthRadius) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);
                    break;
                case 'west':
                    newLng = lng - (distance / earthRadius) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);
                    break;
            }

            const googleMapsURL = `https://www.google.com/maps/dir/${lat},${lng}/${newLat},${newLng}`;
            window.location.href = googleMapsURL;
        }, (error) => {
            alert('Unable to retrieve your location. Please try again.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}
