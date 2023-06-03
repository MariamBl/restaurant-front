import React, { useEffect, useState } from 'react';

const Map = () => {
  const [map, setMap] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    // Check if the Google Maps API script is already loaded
    if (!window.google) {
      // Load the Google Maps API script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBC7TrnSJ6ZvaNUaspY6zbmOAbrz5PFF04&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.addEventListener('load', initializeMap);

      return () => {
        script.removeEventListener('load', initializeMap);
      };
    } else {
      // Google Maps API already loaded, initialize the map
      initializeMap();
    }
  }, []);

  useEffect(() => {
    // Fetch pharmacies data from the API
    fetch('http://localhost:8080/restaurants/api/restaurants')
      .then((response) => response.json())
      .then((data) => {
        setPharmacies(data);
      })
      .catch((error) => {
        console.error('Error fetching Restaurant:', error);
      });
  }, []);

  const initializeMap = () => {
    if (navigator.geolocation) {
      // Fetch the user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapOptions = {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
            // Add your custom map styles here
            // Example:
            // styles: [
            //   {
            //     elementType: 'geometry',
            //     stylers: [
            //       {
            //         color: '#f8f9fa',
            //       },
            //     ],
            //   },
            //   {
            //     elementType: 'labels.text.fill',
            //     stylers: [
            //       {
            //         color: '#000000',
            //       },
            //     ],
            //   },
            // ],
          };
          const newMap = new window.google.maps.Map(
            document.getElementById('map'),
            mapOptions
          );
          setMap(newMap);
        },
        (error) => {
          console.error('Error getting current location:', error);
          // Default coordinates if user location not available
          const mapOptions = {
            center: { lat: 31.7945, lng: -7.0849 },
            zoom: 15,
            // Add your custom map styles here
            // Example:
            // styles: [
            //   {
            //     elementType: 'geometry',
            //     stylers: [
            //       {
            //         color: '#f8f9fa',
            //       },
            //     ],
            //   },
            //   {
            //     elementType: 'labels.text.fill',
            //     stylers: [
            //       {
            //         color: '#000000',
            //       },
            //     ],
            //   },
            // ],
          };
          const newMap = new window.google.maps.Map(
            document.getElementById('map'),
            mapOptions
          );
          setMap(newMap);
        }
      );
    } else {
      // Default coordinates if geolocation not supported
      const mapOptions = {
        center: { lat: 31.7945, lng: -7.0849 },
        zoom: 15,
        // Add your custom map styles here
        // Example:
        // styles: [
        //   {
        //     elementType: 'geometry',
        //     stylers: [
        //       {
        //         color: '#f8f9fa',
        //       },
        //     ],
        //   },
        //   {
        //     elementType: 'labels.text.fill',
        //     stylers: [
        //       {
        //         color: '#000000',
        //       },
        //     ],
        //   },
        // ],
      };
      const newMap = new window.google.maps.Map(
        document.getElementById('map'),
        mapOptions
      );
      setMap(newMap);
    }
  };

  const clearMarkers = () => {
    // Remove all markers from the map
    if (map && map.markers) {
      map.markers.forEach((marker) => {
        marker.setMap(null);
      });
    }
  };

  useEffect(() => {
    if (map && pharmacies && pharmacies.length > 0) {
      // Clear existing markers
      clearMarkers();

      // Create new markers for each pharmacy
      pharmacies.forEach((pharmacy) => {
        const markerOptions = {
          position: { lat: pharmacy.lat, lng: pharmacy.log }, // Use the pharmacy's latitude and longitude
          map: map,
          title: pharmacy.nom, // Set the marker title as the pharmacy's name
        };

        const marker = new window.google.maps.Marker(markerOptions);

        // Add click event listener to the marker
        marker.addListener('click', () => {
          // Handle marker click event, e.g., display additional information
          console.log(`Clicked marker: ${pharmacy.nom}`);
        });
      });
    }
  }, [map, pharmacies]);

  return (
    <div>
      <h1>Restaurant Map</h1>
      <div
        id="map"
        style={{ width: '80%', height: '600px', marginLeft: '190px' }}
      ></div>
    </div>
  );
};

export default Map;
