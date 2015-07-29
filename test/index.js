describe("Drawing HTML overlays", function() {
  var mapWithOverlays, overlay;

  beforeEach(function() {
    mapWithOverlays = mapWithOverlays || new GMaps({
      el : '#overlays',
      lat : -12.0433,
      lng : -77.0283,
      zoom : 12
    });

    overlay = overlay || mapWithOverlays.drawOverlay({
      lat: mapWithOverlays.getCenter().lat(),
      lng: mapWithOverlays.getCenter().lng(),
      layer: 'overlayLayer',
      content: '<div class="overlay">Lima</div>',
      verticalAlign: 'top',
      horizontalAlign: 'center'
    });
  });

  it("should add the overlay to the overlays collection", function() {
    expect(mapWithOverlays.overlays.length).toEqual(1);
    expect(mapWithOverlays.overlays[0]).toEqual(overlay);
  });

  it("should add the overlay in the current map", function() {
    expect(overlay.getMap()).toEqual(mapWithOverlays.map);
  });

  describe("With events", function() {
    var callbacks, overlayWithClick;

    beforeEach(function() {
      callbacks = {
        onclick: function() {
          // console.log('Clicked the overlay');
        }
      };

      expect.spyOn(callbacks, 'onclick').andCallThrough();

      overlayWithClick = mapWithOverlays.drawOverlay({
        lat: mapWithOverlays.getCenter().lat(),
        lng: mapWithOverlays.getCenter().lng(),
        content: '<p>Clickable overlay</p>',
        click: callbacks.onclick
      });
    });

    it("should respond to click event", function(done) {
      this.timeout(10000);

      google.maps.event.addListenerOnce(overlayWithClick, 'ready', function () {
        google.maps.event.trigger(overlayWithClick.element, 'click');
        expect(callbacks.onclick).toHaveBeenCalled();

        done();
      });
    });
  });
});