function handleErrors(errors) {
	console.log(errors);
};

function getTracks(myTracks) {
	firstTrack = myTracks.tracks.items[0];

	printTrack(firstTrack);
	printAllTracks(myTracks.tracks.items);
};

function printTrack(track) {

	$('.widget .title').html(track.name);
	$('.widget .author').html(track.artists[0].name);
	$('.widget .author').data('author-id', track.artists[0].id);
	$('.widget .cover img').attr('src', track.album.images[0].url);
	$('.js-player').attr('src', track.preview_url);
};

function printAllTracks(myTracks) {
	$('.js-list-tracks').empty();

	myTracks.forEach(function(track){
		html = `<li class="list-group-item" data-track-name="${track.name}" data-track-id="${track.id}" data-track-url="${track.preview_url}">${track.name}</li>`
		$('.js-list-tracks').append(html);
	});
};

function printTime() {
	var current = $('.js-player').prop('currentTime');
	$('.js-time').val(current);
};

function printAuthorModal(response) {
	console.log("on print author modal");

	var name		 = response.name;
	var photo		 = response.images[0].url;
	var genres		 = response.genres.map(function(element){ return element}).toString();
	var followers	 = response.followers.total;
	var popularity	 = response.popularity;

	$('#title').text(name);
	$('#photo').attr('src', photo);
	$('genres').text(genres);
	$('followers').text(followers);
	$('popularity').text(popularity);

	$('.js-modal').modal("show");

};

function getAuthorInfo() {
	authorId = $('.widget .author').data('author-id');

	$.ajax({
		url: "https://api.spotify.com/v1/artists/"+authorId,
		success: printAuthorModal,
		error: handleErrors
	});
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

	$('.js-play').on ('click', function(){
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

	$('.js-author').on('click', getAuthorInfo);

	$('.js-show-more').on('click', function(){
		$('.js-modal-tracks').modal('show');

		$('li').on ('click', function(event){
			console.log("on track click");
			console.log($(event.target));
			console.log($(event.target).data('track-url'));
			$('.widget .title').html($(event.target).data('track-name'));
			$('.js-player').attr('src', $(event.target).data('track-url'));
			$('.js-modal-tracks').modal('hide');
		});
	});

});