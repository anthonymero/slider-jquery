"use strict";
	$(function(){ 

		
		var $slides = $('#slider>img'); //select Jquery objects images
		var $activeSlide = $slides.eq(0);//select 1st image
		var $pagination = $('#pagination');//select div #pagination
		var nbSlides = $slides.length; // recover slider's number of images
		var html = "";
		var activeSlideIndex = $slides.index($activeSlide);

		for(let i = 1; i <= nbSlides; i++) {
			html +=   '<span>' +i +'</span>';
		}

		$pagination = $pagination.html(html);

		var $pages = $('#pagination span');

		function updatePagination(){

			$pages.removeClass('active');
			var $page = $pages.eq(activeSlideIndex);
			$page.addClass('active');

		}

		updatePagination();

		function gotoSlide(indexSlideToShow) {

			var $slideToShow = $slides.eq(indexSlideToShow);
			$activeSlide.fadeOut();
			$slideToShow.fadeIn();
			activeSlideIndex = indexSlideToShow;
			$activeSlide = $slideToShow;
			updatePagination();
			
		}


		function goToNextSlide(){
			var SlideToShowIndex = activeSlideIndex + 1; 
      
			if(SlideToShowIndex >= nbSlides){	
				gotoSlide(0);
			}
			else {
				gotoSlide(SlideToShowIndex);
			}
		}


		function goToPrevSlide(){

			if(activeSlideIndex == 0){
				gotoSlide(nbSlides -1);
			}

			else {
				gotoSlide(activeSlideIndex - 1);
			}
      
		}

		function random(){
			
			do{
				var getRandom = Math.random();
				var randomIndex = Math.floor(getRandom*nbSlides);
				
			}
			while (randomIndex == activeSlideIndex);
			gotoSlide(randomIndex);

		}


		$('#next').click(goToNextSlide);
		$('#previous').click(goToPrevSlide);
		$('#rand').click(random);


	$pages.click(function(){

		var pageIndex = $pages.index(this);
		gotoSlide(pageIndex);

	});

	$(document).keydown(function(event){

		switch(event.keyCode) {

			case 37 :
			goToPrevSlide();
			break;

			case 39:
			goToNextSlide();
			break;

			case 32:
			$('#play').click();
			//$('#play').trigger('click');
			break;

		}
	})

	var autoplay = false;
	var interval;
	var $buttonPlay = $('#play');
	var $buttonPause = $('#pause');

	function play(){
		autoplay = true;
		interval = setInterval(goToNextSlide, 2000);

	}

	function stop(){
		autoplay = false;
		clearInterval(interval);
	}
    
    $('#play, #pause').click(function(){
    	if(autoplay){
    		stop();
    		
    	
    	}
    	else{
    		play();
    	
    		
    	}

    		$buttonPause.toggle();
    		$buttonPlay.toggle();


    });
		
		

	});
