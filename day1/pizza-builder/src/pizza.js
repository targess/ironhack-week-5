$(document).on('ready', function(){

	$('.crust').removeClass('crust-gluten-free');
	$('.btn-sauce').removeClass('active');
	$('.sauce').removeClass('sauce-white');
	$('.btn-crust').removeClass('active');

	$('.btn-pepperonni').on('click', function(){
		$('.btn-pepperonni').toggleClass('active');
		$('.pep').toggle();

		var priceInitTxt = $('.price strong').text();
		var priceInit = parseInt(priceInitTxt.slice(1));

		if ( $('.btn-pepperonni').hasClass('active') ) {

			priceInit = priceInit + 1;
		} else {
			
			priceInit = priceInit - 1;
		}
		
		$('.price strong').text('$'+priceInit)
	});

	$('.btn-mushrooms').on('click', function(){
		$('.btn-mushrooms').toggleClass('active');
		$('.mushroom').toggle();

		var priceInitTxt = $('.price strong').text();
		var priceInit = parseInt(priceInitTxt.slice(1));

		if ($('.btn-mushrooms').hasClass('active')) {
			priceInit = priceInit + 1;
		} else { 
			priceInit = priceInit - 1;
		}

		$('.price strong').text('$'+priceInit)	

	});


	$('.btn-green-peppers').on('click', function(){
		$('.btn-green-peppers').toggleClass('active');
		$('.green-pepper').toggle();
	});

	$('.btn-crust').on('click', function(){
		$('.btn-crust').toggleClass('active');
		$('.crust').toggleClass('crust-gluten-free');
	});

	$('.btn-sauce').on('click', function(){
		$('.btn-sauce').toggleClass('active');
		$('.sauce').toggleClass('sauce-white');
	});
});

