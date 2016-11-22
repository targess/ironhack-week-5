$(document).on ('ready', function() {
	console.log('on document ready');

	$('.js-btn').on ('click', function(event) {
		console.log('on button click');
		event.preventDefault();
		$.ajax({
			type: "GET",
			url: "https://ironhack-characters.herokuapp.com/characters",
			success: showCharacters,
			error: handleErrors
		});
	});

	$('.js-submit').on ('click', function(event){
		console.log('on form submit');
		event.preventDefault();

		var newChar = {
			name: $('#input-name').val(),
			occupation: $('#input-occupation').val(),
			weapon: $('#input-weapon').val()
		};
		console.log(newChar);

		$.ajax({
			type: "POST",
			url: "https://ironhack-characters.herokuapp.com/characters",
			data: newChar,
			success: showCharacters,
			error: handleErrors
		});

	});
});

function showCharacters (response) {
	if (Array.isArray(response)) {
		printCharacters(response);	
	} else {
		printACharacter(response);

	}	
};

function printCharacters (array) {
	array.forEach(function (character) {
		printACharacter(character);
	});

};

function printACharacter (character){
		var html = `
			<li class="list-group-item">
				<h5 class="list-group-item-heading">${character.name}</h5>
				<p class="list-group-item-text">
					<strong>Occupation:</strong> ${character.occupation}
					<strong>Weapon:</strong> ${character.weapon}
				</p>			 
			</li>
		`
		$('ul').append(html);
};

function handleErrors (response) {
	console.log("Error!!!!");
	console.log(response.errors);
};