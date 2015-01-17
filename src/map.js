/*!
** Created by Jacques Vincilione, Justin Johns - Lucien Consulting, INC
**  Requires Google Maps API to be included.
**
** Standard MIT License
Copyright (c) 2015 Lucien Consulting, INC

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**
*/
(function () {
    "use strict";
    var map_marker = { version: "1.0" },
        map;
    /**
     * [initMap initializes map with custom markers]
     * @param  {object}   centerPoint [lat, long coordinates (IE: {lat: 24.2131, lng: 14.45245})]
     * @param  {integer}  zoom        [Integer of zoom level - Defaults to 12]
     * @param  {array}    markers     [Array of Map Objects]
     * @param  {string}   elementId   [DOM Element ID - Defaults to 'map-canvas']
     */
    var initMap = function (centerPoint, zoom, markers, elementId, mapType) {
      // throw error if google maps API is not included
      if (!google.maps) {
        throw new Error("This plugin requires the google maps api to be included on the page. Visit https://developers.google.com/maps/documentation/javascript/tutorial for instructions.");
      }
      // throw error is centerPoint is undefined
      if (!centerPoint) {
        throw new Error("mapConfig.centerPoint is not defined, and is required.");
      }
      // throw error if markers is not an array
      if (!markers || markers.length < 1) {
        throw new Error("mapConfig.markers is not a valid array.");
      }

      // set defaults if values are undefined/null
      zoom = zoom || 12;
      elementId = elementId || "map-canvas";

      var mapOptions = {
        zoom: zoom,
        center: new google.maps.LatLng(centerPoint.lat, centerPoint.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
      };

      map = new google.maps.Map(document.getElementById(elementId), mapOptions);


      /*
        markers requires an image, latLng in each object in the array
        optional values:
        mapSize (defaults to {w: 50, h: 50}), title (defaults to 'My Marker')
      */
      for (var i = 0; i < markers.length; i++) {
        var pos = {
          lat: markers[i].latLng.lat,
          lng: markers[i].latLng.lng
        },
        img = markers[i].image,
        w = markers[i].size.w || 50,
        h = markers[i].size.h || 50,
        title = markers[i].title || "My Marker",
        mapMarker;

        if (!pos.lat || !img) {
          throw new Error("mapConfig.markers.latLng or mapConfig.markers.image is not defined. Array Index = " + i);
        }

        mapMarker = new google.maps.Marker({
          "position": new google.maps.LatLng(pos.lat, pos.lng),
          "icon": new google.maps.MarkerImage(img, new google.maps.Size(w, h)),
          "map": map,
          "zindex": i,
          "title": title
        })
      }
    }

    google.maps.event.addDomListener(window, 'load', function () {
      initMap(mapConfig.centerPoint, mapConfig.zoom, mapConfig.markers, mapConfig.elementId);
    });

}());