'use strict';

var _forEach = require('lodash-compat/collection/forEach'),
    _extend = require('lodash-compat/object/extend'),
    overlaysModule = {};

overlaysModule.drawOverlay = function(options) {
  var overlay = new google.maps.OverlayView(),
      autoShow = true,
      self = this;

  overlay.setMap(this.map);

  if (options.autoShow !== undefined) {
    autoShow = options.autoShow;
  }

  overlay.onAdd = function() {
    if (options.layer === undefined) {
      options.layer = 'overlayLayer';
    }

    var element = document.createElement('div'),
        panes = this.getPanes(),
        overlayLayer = panes[options.layer],
        stopOverlayEvents = ['contextmenu', 'DOMMouseScroll', 'dblclick', 'mousedown'];

    element.style.borderStyle = 'none';
    element.style.borderWidth = '0px';
    element.style.position = 'absolute';
    element.style.zIndex = 100;

    if (typeof options.content === 'string') {
      element.innerHTML = options.content;
    }
    else {
      element.appendChild(options.content);
    }

    overlay.element = element;

    overlayLayer.appendChild(element);

    _forEach(stopOverlayEvents, function(stopOverlayEventName) {
      google.maps.event.addDomListener(element, stopOverlayEventName, function(eventObject) {
        if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1 && document.all) {
          eventObject.cancelBubble = true;
          eventObject.returnValue = false;
        }
        else {
          eventObject.stopPropagation();
        }
      });
    });

    if (typeof options.click === 'function') {
      panes.overlayMouseTarget.appendChild(overlay.element);

      google.maps.event.addDomListener(overlay.element, 'click', function() {
        options.click.call(overlay, overlay, overlay.element);
      });
    }

    google.maps.event.trigger(this, 'ready');

    if (GMaps.trigger) {
      GMaps.trigger('overlay_added', self, this);
    }
  };

  overlay.draw = function() {
    var projection = this.getProjection(),
        pixel = projection.fromLatLngToDivPixel(new google.maps.LatLng(options.lat, options.lng)),
        element = overlay.element,
        content = element.children[0],
        contentHeight = content.clientHeight,
        contentWidth = content.clientWidth;

    options.horizontalOffset = options.horizontalOffset || 0;
    options.verticalOffset = options.verticalOffset || 0;

    switch (options.verticalAlign) {
      case 'top':
        element.style.top = (pixel.y - contentHeight + options.verticalOffset) + 'px';
        break;
      case 'bottom':
        element.style.top = (pixel.y + options.verticalOffset) + 'px';
        break;
      default:
      case 'middle':
        element.style.top = (pixel.y - (contentHeight / 2) + options.verticalOffset) + 'px';
    }

    switch (options.horizontalAlign) {
      case 'left':
        element.style.left = (pixel.x - contentWidth + options.horizontalOffset) + 'px';
        break;
      case 'right':
        element.style.left = (pixel.x + options.horizontalOffset) + 'px';
        break;
      default:
      case 'center':
        element.style.left = (pixel.x - (contentWidth / 2) + options.horizontalOffset) + 'px';
    }

    element.style.display = autoShow ? 'block' : 'none';

    if (!autoShow && options.show) {
      options.show.call(this, element);
    }
  };

  overlay.onRemove = function() {
    var element = overlay.element;

    if (options.remove) {
      options.remove.call(this, element);
    }
    else {
      overlay.element.parentNode.removeChild(overlay.element);
      overlay.element = null;
    }
  };

  this.overlays.push(overlay);

  return overlay;
};

overlaysModule.removeOverlay = function(overlay) {
  for (var i = 0; i < this.overlays.length; i++) {
    if (this.overlays[i] === overlay) {
      this.overlays[i].setMap(null);
      this.overlays.splice(i, 1);

      if (GMaps.trigger) {
        GMaps.trigger('overlay_removed', this, overlay);
      }

      break;
    }
  }
};

overlaysModule.removeOverlays = function() {
  var self = this;

  _forEach(this.overlays, function(overlay) {
    overlay.setMap(null);

    if (GMaps.trigger) {
      GMaps.trigger('overlay_removed', self, overlay);
    }
  });

  this.overlays.length = 0;
};

if (window.GMaps) {
  GMaps.customEvents = GMaps.customEvents || [];
  GMaps.customEvents = GMaps.customEvents.concat(['overlay_added', 'overlay_removed']);

  _extend(GMaps.prototype, overlaysModule);
}

module.exports = overlaysModule;