# gmaps.overlays

gmaps.js module to draw custom overlays.

## Install

For using with bundlers (as Browserify or Webpack):

`npm install gmaps.overlays --save`

Before `require()` this module you need to `require('gmaps.core')`.

For using directly in the browser, download the `gmaps.overlays.js` (or `gmaps.overlays.min.js`) in `dist`.

## Usage

You need to register a `<script>` tag with the Google Maps JavaScript API, then import gmaps.core.

Every Google Maps map needs a container (`<div id="map"></div>` in this demo), which needs to have width and height, and be visible (without `display: none`, for example):

```
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
  <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
  <script src="gmaps.core.js"></script>
  <script src="gmaps.overlays.js"></script>
  <style type="text/css">
    #map {
      width: 400px;
      height: 400px;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = new GMaps({
      el : '#map',
      lat: -12.0433,
      lng: -77.0283,
      zoom: 12
    });

    map.drawOverlay({
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
      layer: 'overlayLayer',
      content: '<div class="overlay">Lima</div>'
    });
  </script>
</body>
</html>
```

For more examples you can check the tests in this repo.

## Documentation

### `drawOverlay(options)`

Creates a custom overlay using HTML, adds it to the map and returns it.

The `options` object should contain:

* `lat` (number): The latitude of the position of the overlay in the map.
* `lng` (number): The longitude of the position of the overlay in the map.
* `autoShow` (boolean): Define if the overlay will be visible at the moment of being added to the map (by default is `true`).
* `layer` (string): The layer when the overlay will be added. There are 8 layers in Google Maps, which are stacked (See _Layers_ section).
* `content` (string or HTML element): The overlay's content. It can be text, HTML string or HTML element.
* `click` (function): A callback called every time the overlay is clicked. If this callback is setted, the overlay will be placed in the `overlayMouseTarget` layer.
* `verticalAlign` (string): The overlay's vertical position according the coordinate in the map (defined by `lat` and `lng`). It can be `top`, `bottom` or `middle` (by default).
* `horizontalAlign` (string): The overlay's horizontal position according the coordinate in the map (defined by `lat` and `lng`). It can be `left`, `right` or `center` (by default).
* `verticalOffset` (number): The offset in pixels, in reference to the `verticalAlign`.
* `horizontalOffset` (number): The offset in pixels, in reference to the `horizontalAlign`.
* `show` (function): A custom function used to show the overlay if `autoShow` is `false`.
* `remove` (function): A custom function used to remove the overlay. By default is not required, since GMaps handles it automatically.

### `removeOverlay(overlay)`

Removes a overlay from the map and the `overlays` property. The `overlay` parameter must be a overlay created with `drawOverlay()` or one of the elements inside the `overlays` property.

### `removeOverlays()`

Remove all the overlays from the map and clear the `overlays` property.

---

### Events

The following methods trigger custom events. You need to add the `gmaps.events` module before using this module to work with those events:

| Method | Event |
| ------ | ----- |
| `drawOverlay` | `overlay_added` |
| `removeOverlay` | `overlay_removed` |
| `removeOverlays` | `overlay_removed` |

---

### Layers

The following layers are available, and are enumerated in the order in which they are stacked from bottom to top:

| Layer | Order |
| ------ | ----- |
| `mapPane` | 0 |
| `overlayLayer` | 1 |
| `overlayShadow` | 2 |
| `markerLayer` | 3 |
| `overlayImage` | 4 |
| `floatShadow` | 5 |
| `overlayMouseTarget` | 6 |
| `floatPane` | 7 |

## Changelog

For pre 0.5.0 versions, check [gmaps.js changelog](https://github.com/hpneo/gmaps#changelog)

### 0.5.0

* Node module format (CommonJS)

## License

MIT License. Copyright 2015 Gustavo Leon. http://github.com/hpneo

Permission is hereby granted, free of charge, to any
person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the
Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
