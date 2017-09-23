$(document).ready( function() {

	// Preloader
	$(window).load(function() {
	  $('#preloader').delay(0).fadeOut(100); 
	  $('body').delay(0).css({
	    'overflow': 'visible'
	  });
	});

	// To not drag images
  $('img').on('dragstart', false);

  // To detect the widths of sprites
  width0 = $('.superhero').width();
  width1 = $('.plane1').width();
  width2 = $('.plane2').width();
  width3 = $('.plane3').width();

  // Animation loop on superhero
	function loop0() {

	  $('.superhero').animate({
	  	'right': 100+'%',
	  	'top': 25+'%'
	  // Animation time in seconds
	  }, 30000, function() {
 			$(this).animate({
				'right': 15+'%',
				'top': '-'+width0
 			}, 0, 'linear', function() {
 				loop0();
 			}, 0);
 		});
	}

	loop0();


  // Animation loop on plane 1
	function loop1() {

	  $('.plane1').animate({
  		'left': 100+'%',
  		'top': 30+'%'
  	// Animation time in seconds
	  }, 30000, function() {
 			$(this).animate({
				'left': '-'+ width1,
				'top': 70+'%'
 			}, 0, 'linear', function() {
 				loop1();
 			}, 0);
 		});
	}

	loop1();


  // Animation loop on plane 2
	function loop2() {

	  $('.plane2').animate({
  		'top': 65+'%'
	  }, 15000, function() {
 			$(this).animate({
 				'left': 100+'%'
	 			}, 15000, function() {
	 				$(this).animate({
	 					'top': 100+'%',
	 					'left': 50+'%'
	 			}, 0, 'linear', function() {
	 				loop2();
	 			}, 0);
 			});
 		});	
	}

	loop2();


  // Animation loop on plane 2
	function loop3() {

  	// Animation time in seconds
	  $('.plane3').animate({
  		'bottom': 25+'%',
  		'left': 100+'%'
	  }, 30000, function() {
 			$(this).animate({
				'left': 30+'%',
				'bottom': '-'+width3
 			}, 0, 'linear', function() {
 				loop3();
 			}, 0);
 		});
	}

	loop3();

});