chiquitum = ["Al ataquerl ", "qué dise usteer ese pedazo de", "te voy a borrar el cerito", "está la cosa muy malar jarl pupita.",
	"No puedor diodenoo", "por la gloria de mi madre"];

$(document).on('ready', function () {
	

	$('.js-btn').on('click',function () {
		var randomValue = Math.floor((Math.random() * 4));
		$('.text-info').text(chiquitum[randomValue]);
	});

	$('.js-input').on('change',function(event) {
		event.preventDefault();
		var input_val = $('.js-input').val();

		chiquitum.push(input_val);
		$('.text-info').text(input_val);
	});

	$('.js-link').on('click',function () {
		if ($('.js-link').text() === 'Show') {
			$('.js-link').text('Hide');
			chiquitum.forEach(function(element){
				li = document.createElement('li');
				text = document.createTextNode(element);
				li.appendChild(text);
				$('ul').append(li);
			})
			$('li').addClass('list-group-item');

		} else if ($('.js-link').text() === 'Hide'){
			$('.js-link').text('Show');
			$('ul').text('');
		}
	})
});
