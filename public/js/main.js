window.addEventListener('load', () => {
  let geocoder =  new google.maps.Geocoder();

    const berlin = {
      lat: 52.520008,
      lng: 13.404954
    };
  
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: berlin
    });
    var marker = new google.maps.Marker({
      position: berlin,
      map: map
  });
  const address = "Potsdamer Platz 50, Berlin"
  function codeAddress(address) {

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            console.log(address)
                var marker = new google.maps.Marker({
                position: address,
                map: map
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
codeAddress(address);

  });

