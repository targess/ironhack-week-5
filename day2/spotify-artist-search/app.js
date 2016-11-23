$(document).on ('ready', function() {

	$('.js-search').on ('click', function(event) {
		$('#search-results').html("");
		event.preventDefault();
		var searchTerm = $('#input-search').val();
		var myUrl = "https://api.spotify.com/v1/search?type=artist&query="+searchTerm;
		$.ajax ({
			type: "GET",
			url: myUrl,
			success: showArtists,
			error: handleErrors
		});
	});
});

function showArtists (response) {
	console.log(response);
	response.artists.items.forEach(function(artist) {
		printArtist(artist);
	});

	$('.js-artist-info').on ('click', function(event) {
		event.preventDefault();
		artistId = event.currentTarget.attributes["data-artist-id"].value;
		findAlbums(artistId);
	});
};

function showAlbums(response) {
	console.log(response);
	$('#search-results').html("");
	response.items.forEach(function(album) {
		printAlbum(album);
	});
};

function handleErrors(errors) {
	console.log(errors);
};

function findAlbums(artistId) {
	console.log(artistId);
	var myUrl = "https://api.spotify.com/v1/artists/"+artistId+"/albums";
	$.ajax ({
		type: "GET",
		url: myUrl,
		success: showAlbums,
		error: handleErrors
	});
};

function printArtist(artist) {
	var title    = artist.name;
	var genre    = artist.genres[0];
	var imageUrl = "#";
	var id 		 = artist.id;

	if (artist.images.length > 0) {
		imageUrl = artist.images[0].url;	
	}

	html = `
		<a href="#" class="js-artist-info" data-artist-id="${id}">
			<div class="col-sm-4 col-md-3">
				<div class="thumbnail">
					<img src="${imageUrl}" alt="No Image" style="height: 200px; width: 100%;" />
					<div class="caption">
						<h3>${title}</h3>
						<p><strong>Genre:</strong> ${genre}</p>
					</div>
				</div>
			</div>
		</a>
	`

	$('#search-results').append(html);
};

function printAlbum(album) {
	var title    = album.name;
	var type    = album.type;
	var imageUrl = "#";
	var id 		 = album.id;

	if (album.images.length > 0) {
		imageUrl = album.images[0].url;	
	}

	html = `
		<a href="#" class="js-album-info" data-album-id="${id}">
			<div class="col-sm-4 col-md-3">
				<div class="thumbnail">
					<img src="${imageUrl}" alt="No Image" style="height: 200px; width: 100%;" />
					<div class="caption">
						<h3>${title}</h3>
						<p><strong>Type:</strong> ${type}</p>
					</div>
				</div>
			</div>
		</a>
	`

	$('#search-results').append(html);
};