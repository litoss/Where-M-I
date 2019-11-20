const less = new IconButton('remove');
less.unbounded = true;
less.listen('click', zoomOut);

const menu = new IconButton('menu');
menu.unbounded = true;
menu.listen('click', openMenuDrawer);

const more = new IconButton('add');
more.unbounded = true;
more.listen('click', zoomIn);

const geolocation = new IconButtonToggle('my_location','location_disabled');
geolocation.unbounded = true;
geolocation.listen('MDCIconButtonToggle:change', localize);
