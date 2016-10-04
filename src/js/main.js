$(document).ready(function() {

	if($(".carousel__list").length > 0){
		$(".carousel__list").customCarousel({
			slideTimeout: 5000,
	        nextSelector: $(".carousel__arrow_next"),
	        prevSelector: $(".carousel__arrow_prev"),
		});
	}

	if($(".card__review-list").length > 0){
		$(".card__review-list").customCarousel({
	        nextSelector: $(".card__review-arrow_next"),
	        prevSelector: $(".card__review-arrow_prev"),
	        changeSelector: $(".card__review-point"),
	        afterSlideCallback: function(e){
	        	$(".card__review-point").removeClass("card__review-point_active");
	        	$(".card__review-point").eq(e.currentIndex).addClass("card__review-point_active");
	        }
		});
	}

	$(".fancybox-link").fancybox({
		padding: 0,
        closeBtn: false,
        fitToView: false
	});

	$(".header__basket-count").click(function(){
		var popup = $(".header__basket-popup");
		popup.show();
		setTimeout(function(){
			popup.fadeOut(300);
		}, 1000)
	});

	var $select = $(".select").select2();

	$(".select").on("select2:open", function () {
		$(".select2-search").append("<span class='select__button'></span>");
		$(".select__button").click(function(){
			$select.select2("close");
		});
	});

	$(".select").on("select2:close", function () { 
		$("select__button").remove();
	});

	$(window).scroll(function(){
		$(".select2-container.select2-dropdown-open").not($(this)).select2('positionDropdown');
	});

	$(".count__arrow").click(function(e){
		e.preventDefault();
		var self = $(this);
		var parent = self.closest(".count");
		var countEl = parent.find(".count__input");
		var count = parseInt(countEl.val());

		if(self.hasClass("count__arrow_plus")){
			count++;
		}

		if(self.hasClass("count__arrow_minus")){
			count--;
		}

		if(count >= 1){
			countEl.val(count);
		}
	});

	$(".left-menu__item_drop .left-menu__link").click(function(e){
		e.preventDefault();
		var self = $(this);
		var parent = self.closest(".left-menu__item");

		if(parent.hasClass("left-menu__item_active")){
			parent.removeClass("left-menu__item_active");
		} else {
			$(".left-menu__item").removeClass("left-menu__item_active");
			parent.addClass("left-menu__item_active");
		}
	});

	if($("#list").prop('checked') == true){
		$(".product__wrapper").addClass("product__wrapper_list");
	}

	$(".filter__type").find(".filter__input").change(function(){
        if($("#list").prop('checked') == true){
        	$(".product__wrapper").addClass("product__wrapper_list");
      	} else {
            $(".product__wrapper").removeClass("product__wrapper_list");
     	} 
    });

    if($("#headerMode").prop('checked') == true){
		$(".page").addClass("page_wholesaler");
	}

	$("#headerMode").change(function(){
        if($(this).prop('checked') == true){
        	$(".page").addClass("page_wholesaler");
      	} else {
            $(".page").removeClass("page_wholesaler");
     	} 
    });
	
	if ($("#map").length > 0){
		ymaps.ready(init);
	    var myMap;

	    function init(){     
	        myMap = new ymaps.Map("map", {
	            center: [55.796911068963226,37.948592499999975],
	            zoom: 16,
	            controls: ['smallMapDefaultSet']
	        });

	        myMap.behaviors.disable('scrollZoom');

	        myPlacemark = new ymaps.Placemark([55.796911068963226,37.948592499999975], {},
	        	{
	        		preset: 'islands#icon',
	        		iconColor: "#ff3851"
	        	});

	        myMap.geoObjects.add(myPlacemark);
	    }
	}

	$(".cabinet__row_toggle").click(function(e){
		var self = $(this);
		self.toggleClass("cabinet__row_active");
		self.next().slideToggle(500);
	});
});