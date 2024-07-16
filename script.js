let map;
let heatmap;

function initMap() {
  const initialLocation = { lat: -0.0917, lng: 34.7679 }; // Kisumu
  map = new google.maps.Map(document.getElementById('map'), {
    center: initialLocation,
    zoom: 13,
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map,
  });
}

function getPoints() {
  return [
    new google.maps.LatLng(37.782, -122.447),
    new google.maps.LatLng(37.782, -122.445),
    new google.maps.LatLng(37.782, -122.443),
    new google.maps.LatLng(37.782, -122.441),
    new google.maps.LatLng(37.782, -122.439),
    new google.maps.LatLng(37.782, -122.437),
    new google.maps.LatLng(37.782, -122.435),
    new google.maps.LatLng(37.785, -122.447),
    new google.maps.LatLng(37.785, -122.445),
    new google.maps.LatLng(37.785, -122.443),
    new google.maps.LatLng(37.785, -122.441),
    new google.maps.LatLng(37.785, -122.439),
    new google.maps.LatLng(37.785, -122.437),
    new google.maps.LatLng(37.785, -122.435),
  ];
}

function updateRiskLevel() {
  const riskLevel = Math.random();
  const needle = document.getElementById('risk-needle');
  const description = document.getElementById('risk-description');
  
  needle.style.transform = `rotate(${riskLevel * 180 - 90}deg)`;
  
  if (riskLevel < 0.3) {
    description.textContent = "Low Risk: Area is currently calm. Stay alert as usual.";
  } else if (riskLevel < 0.7) {
    description.textContent = "Moderate Risk: Exercise increased caution in this area.";
  } else {
    description.textContent = "High Risk: Be extremely vigilant. Consider avoiding the area if possible.";
  }
}

function updateAIRecommendations() {
  const recommendations = [
    "Based on recent patterns, avoid walking alone  after 10 PM.",
    "Increased car break-ins reported in the downtown area. Use secure parking facilities.",
    "Increased demonstrations reported in Kondele, stay vigilant",
    "Increased Pick pocketiing incidents reported, stay secure",
  ];
  
  document.getElementById('ai-recommendations').textContent = recommendations[Math.floor(Math.random() * recommendations.length)];
}

setInterval(() => {
  updateRiskLevel();
  updateAIRecommendations();
}, 30000);

updateRiskLevel();
updateAIRecommendations();

document.getElementById('safety-search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const area = document.getElementById('area-input').value;
  geocodeAddress(area);
});

function geocodeAddress(address) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      checkAreaSafety(results[0].formatted_address);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function checkAreaSafety(area) {
  const safetyLevel = Math.random();
  let result;
  
  if (safetyLevel < 0.3) {
    result = `${area} is currently considered a low-risk area. Exercise normal caution.`;
  } else if (safetyLevel < 0.7) {
    result = `${area} has a moderate risk level. Be extra aware of your surroundings.`;
  } else {
    result = `${area} is currently a high-risk area. Take extra precautions and consider avoiding if possible.`;
  }
  
  document.getElementById('search-result').textContent = result;
}

function detectLocation() {
  console.log("Detecting location...");
  setTimeout(() => {
    const locationSafety = Math.random();
    const locationAlert = document.getElementById('location-alert');
    
    if (locationSafety < 0.5) {
      locationAlert.textContent = "Your current location is considered safe. Stay alert as usual.";
      locationAlert.style.backgroundColor = "#4CAF50";
      locationAlert.style.color = "white";
    } else {
      locationAlert.textContent = "Warning: Your current location has a higher than average risk level. Be extra vigilant.";
      locationAlert.style.backgroundColor = "#F44336";
      locationAlert.style.color = "white";
    }
  }, 2000);
}

detectLocation();

// Initialize the map when the page loads
google.maps.event.addDomListener(window, 'load', initMap);