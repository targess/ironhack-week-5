function handleErrors(errors) {
	console.log(errors);
};

function getTracks(myTracks) {
	firstTrack = myTracks.tracks.items[0];

	console.log(firstTrack);
	$('.widget .title').html(firstTrack.name);
	$('.widget .author').html(firstTrack.artists[0].name);
	$('.widget .cover img').attr('src', firstTrack.album.images[0].url);
	$('.js-player').attr('src', firstTrack.preview_url);

};

function printTime() {
	var current = $('.js-player').prop('currentTime');
	$('.js-time').val(current);
	// console.debug('Current time: ' + current);
};


$(document).on ("ready", function(){
	console.log("on document ready");
	$('.js-searcher').on ("click", function(event){
		console.log("on button click");
		event.preventDefault();
		var searchValue = $('[data-search]').val();

		$.ajax({
			url: "https://api.spotify.com/v1/search?type=track&q="+searchValue,
			success: getTracks,
			error: handleErrors
		});
	});

	$('.js-play').on ("click", function(){
		console.log("on player click");
		var $playerButton = $('.js-play');
			if ($playerButton.hasClass('disabled')) {
				$playerButton.removeClass('disabled');
				$playerButton.addClass('playing');
				$('.js-player').trigger('play');
			} else if ($playerButton.hasClass('playing')) {
				$playerButton.removeClass('playing');
				$playerButton.addClass('disabled');
				$('.js-player').trigger('pause');			

		}
	});

	$('.js-player').on('timeupdate', printTime);
});