window.addEventListener('load', () => {

    const berlin = {
      lat: 52.520008,
      lng: 13.404954
    };
  
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: berlin
    });

    function getPlaces() {
  axios
    .get('/maps/api')
    .then(response => {
      console.log(response.data.places)
      // placePlaces(response.data.places);
      response.data.places.forEach((place)=> {
        const {address,zipCode,name} = place
        const fullAddress = `${address},${zipCode}`
        console.log(name)

        geocodeAddress(geocoder, map, fullAddress,name)

      })
    })
    .catch(error => {
      console.log(error);
    });
}

const geocoder = new google.maps.Geocoder();


function geocodeAddress(geocoder, resultsMap,fullAddress,placeName) {
  const address = fullAddress
 console.log(placeName)
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === 'OK') {
    console.log(results[0].geometry.location.lat())
      let marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  label: {
                    color: 'red',
                    fontWeight: 'bold',
                    text: placeName,
                    fontSize: '24px',
                },
                icon: {
                  // labelOrigin: new google.maps.Point(11, 50),
                  url: 'default_marker.png',
                  // size: new google.maps.Size(22, 40),
                  // origin: new google.maps.Point(0, 0),
                  // anchor: new google.maps.Point(11, 40),
                }});
    } else {
      console.log(`Geocode was not successful for the following reason: ${status}`);
    }
  });
}



getPlaces();


  });