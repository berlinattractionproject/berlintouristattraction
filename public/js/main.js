window.addEventListener('load', () => {
    const berlin = {
      lat: 52.520008,
      lng: 13.404954
    };
  
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: berlin
    });
  });
  