$(document).on ('ready', function() {
	console.log("on document ready");
	if ("geolocation" in navigator) {
		console.log("geolocation ready");
		navigator.geolocation.getCurrentPosition(onLocation, onError);
	} else {
		console.log("geolocation not ready");
	}

	function onLocation(response) {
		latitude  = response.coords.latitude;
		longitude = response.coords.longitude;
		printMap(latitude, longitude)
	};

	function onError(errors) {
		console.log(errors);
	}

	function printMap(lat, long) {
		var mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=12&size=400x400`

		var mapIfram = `
			<iframe width="600" height="450" frameborder="0" style="border:0"
src="https://www.google.com/maps/embed/v1/undefined?origin=...&q=...&destination=...&center=${lat},${long}&zoom=12&size=400x400" allowfullscreen></iframe>
		`
		$('.js-map').attr('src', mapUrl)

	}
})