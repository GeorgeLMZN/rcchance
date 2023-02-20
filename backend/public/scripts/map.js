ymaps.ready(function () {  
    var map = new ymaps.Map("map", {
      center: [53.180614, 50.090240], 
      zoom: 15
    });
    myPlacemark = new ymaps.Placemark([53.180614, 50.090240], {
        iconLayout: 'default#image',
        iconImageHref: 'public/images/logo.png',
    });
    map.geoObjects.add(myPlacemark);
})