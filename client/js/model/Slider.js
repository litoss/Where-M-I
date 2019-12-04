class Slider extends mdc.slider.MDCSlider {
    constructor(chips, options) {

        var slider = document.createElement('div');
        slider.className = "mdc-slider";
        slider.setAttribute('tabindex','0');
        slider.setAttribute('role','slider');
        slider.setAttribute('aria-valuemin','0');
        slider.setAttribute('aria-valuemax','100');
        slider.setAttribute('aria-valuenow','0');
        slider.setAttribute('aria-label','Select Value');
        slider.setAttribute('aria-disabled', 'true');

        var trackContainer = document.createElement('div');
        trackContainer.className = "mdc-slider__track-container";
        slider.appendChild(trackContainer);

        var track = document.createElement('div');
        track.className = "mdc-slider__track";
        trackContainer.appendChild(track);

        var thumbContainer = document.createElement('div');
        thumbContainer.className = "mdc-slider__thumb-container";
        slider.appendChild(thumbContainer);

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

        slider.innerHTML = '<div class="mdc-slider__track-container"> <div class="mdc-slider__track"></div></div><div class="mdc-slider__thumb-container"> <div class="mdc-slider__pin"> <span class="mdc-slider__pin-value-marker"></span> </div><svg class="mdc-slider__thumb" width="21" height="21"> <circle cx="10.5" cy="10.5" r="7.875"></circle> </svg> <div class="mdc-slider__focus-ring"></div></div>';
        super(slider);
    }
}
