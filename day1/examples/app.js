
$(document).on('ready', function () {
	console.log("page loaded")

	$('.js-btn').on('click',function () {
		console.log('hey!')
		$('ul, p').fadeToggle();
		$('input[type=text]').fadeToggle();
	});
});

console.log("hola")