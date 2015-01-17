# Google-Map-Marker
Create custom map markers on your website using Google Maps and this simple Javascript Plugin.

Requires Google Maps API to also be included on page. 

Demo here: http://lucienconsulting.com/projects/maps/

## Configuration is simple.
1. Include the Maps API on your page. (https://developers.google.com/maps/documentation/javascript/tutorial)
2. Include map.min.js from this repo on your page.
3. Create a config object.

### Config object example:
```javascript
  var mapConfig = {
    centerPoint: {
        lat: 33.7496844,
        lng: -84.7516932
    }, 
    zoom: 15, 
    markers: [
        {
            image : "http://lucienconsulting.com/_/images/map_logo.png",
            title : "Lucien Consulting",
            latLng : {
                lat: 33.7496844,
                lng: -84.7516932
            },
            size : {
                w: 50,
                h: 76,
            }
        }
    ],
    elementId: 'map-canvas'
  }
```

The "markers" config array requires objects with a minimum requirement of having an image and coordinates. (latLng object). Theoretically, you can have as many markers as you need.
