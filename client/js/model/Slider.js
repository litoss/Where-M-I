class Slider extends mdc.slider.MDCSlider {
    constructor() {

        var slider = document.createElement('div');
        slider.className = "mdc-slider mdc-slider--discrete";
        slider.setAttribute('tabindex','0');
        slider.setAttribute('role','slider');
        slider.setAttribute('aria-label','Select Value');

        var trackContainer = document.createElement('div');
        trackContainer.className = "mdc-slider__track-container";
        slider.appendChild(trackContainer);

        var track = document.createElement('div');
        track.className = "mdc-slider__track";
        trackContainer.appendChild(track);

        var thumbContainer = document.createElement('div');
        thumbContainer.className = "mdc-slider__thumb-container";
        slider.appendChild(thumbContainer);

        var pin = document.createElement('div');
        pin.className = 'mdc-slider__pin';
        pin.innerHTML = '<span class="mdc-slider__pin-value-marker"></span>';
        thumbContainer.appendChild(pin);


        var thumb = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        thumb.setAttribute('class','mdc-slider__thumb');
        thumb.setAttribute('width','21');
        thumb.setAttribute('height','21');
        thumbContainer.appendChild(thumb);

        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx','10.5');
        circle.setAttribute('cy','10.5');
        circle.setAttribute('r','7.875');
        thumb.appendChild(circle);

        var focusRing = document.createElement('div');
        focusRing.className = "mdc-slider__focus-ring";
        thumbContainer.appendChild(focusRing);

        //slider.innerHTML = '<div class="mdc-slider__track-container"> <div class="mdc-slider__track"></div></div><div class="mdc-slider__thumb-container"> <div class="mdc-slider__pin"> <span class="mdc-slider__pin-value-marker"></span> </div><svg class="mdc-slider__thumb" width="21" height="21"> <circle cx="10.5" cy="10.5" r="7.875"></circle> </svg> <div class="mdc-slider__focus-ring"></div></div>';
        super(slider);
    }
}
