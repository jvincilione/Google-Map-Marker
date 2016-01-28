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
var MapMarker = (function () {
    "use strict";
    /**
    * mapMarker initializes map with custom markers
    * @param  {object}   options - list of options for setting up your map
    * options.centerPoint - lat, long coordinates (IE: {lat: 24.2131, lng: 14.45245})]
    * options.zoom - Integer of zoom level - Defaults to 12
    * options.markers - Array of Map Objects
    * options.elementId - DOM Element ID - Defaults to 'map-canvas'
    * options.mapType - unused at the moment
    */
    var MapMarker = function (options) {
        this.version = { version: "1.1.0" },
        this.map;

        var centerPoint = options.centerPoint, 
            zoom = options.zoom, 
            markers = options.markers,
            elementId = options.elementId;

        // throw error if google maps API is not included
        if (!google.maps) {
            throw new Error("This plugin requires the google maps api to be included on the page. " +
                            "Visit https://developers.google.com/maps/documentation/javascript/tutorial " + 
                            "for instructions.");
        }
        // throw error is centerPoint is undefined
        if (!centerPoint) {
            throw new Error("options.centerPoint is not defined, and is required.");
        }
        // throw error if markers is not an array
        if (!markers || markers.length < 1) {
            throw new Error("options.markers is not a valid array.");
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

        this.map = new google.maps.Map(document.getElementById(elementId), mapOptions);

        /*
        markers requires an image/color, latLng in each object in the array
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
            marker;

            if (img.indexOf('/') === -1) {
                // the image is a color
                img = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + img;
                w = 21;
                h = 34;
            }

            if (!pos.lat || !img) {
                // throw new Error("mapConfig.markers.latLng or mapConfig.markers.image is not defined. Array Index = " + i);
            }

            marker = new google.maps.Marker({
                "position": new google.maps.LatLng(pos.lat, pos.lng),
                "icon": new google.maps.MarkerImage(img, new google.maps.Size(w, h)),
                "map": this.map,
                "zindex": i,
                "title": title
            })
        }
    }
    return MapMarker;
}());