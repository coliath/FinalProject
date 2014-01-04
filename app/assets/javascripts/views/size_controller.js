



$(document).on("loaded", function () {

	// these are pretty random, do some typical screen size reseach and rethink
	var minResourceWidth = 480;
	var stnResourceWidth = 800;
	var minNavWidth = 200;
	var minSocialWidth = 280;
	var maxSocialWidth = 600;

	var $nav = $("#left-nav");
	var $social = $("#social-content");
	var $resource = $("#resource-content");

	var handleResize = function () {
		setHeights();
		setWidths();
	}

	var setHeights = function () {	
		setHeight($("#table-of-contents").find("ul"));
		setHeight($resource.find(".resource"));
		setHeight($social.find(".social-list"), 33);
	}

	var setHeight = function ( $els, additionalOffset ) {
		if ( typeof additionalOffset != "number" ) { additionalOffset = 0; }
		var viewportHeight = $(window).height();

		_.each($els, function (el) {
			$(el).height(viewportHeight - $(el).position().top - additionalOffset);
		});
	}

	var getTotalShowingWidth = function () {
		return $social.outerWidth() + $resource.outerWidth() + $nav.outerWidth();
	}

	var setWidths = function () {
		var viewportWidth = $(window).width();
		var deltaWidth = viewportWidth - getTotalShowingWidth(); 
		if ( deltaWidth > 0 ) { 
			increaseWidth(deltaWidth);
		} else { 
			decreaseWidth(deltaWidth);
		}
	}

	var increaseWidth = function ( amount ) {
		console.log("increasing social width");
		var socialIncAmount = 0;
		var resourceIncAmount = 0;
		var socialShowing = true;
		if ( $social.width() < 279 ) { socialShowing = false; }
		while ( amount > 2 ) {
			if ( socialShowing && $social.width() > 279 && $social.width() < maxSocialWidth ) {
				socialIncAmount++;
				amount--;
			}
			resourceIncAmount++;
			amount--;
		}
		if ( socialShowing ) { incrementElementWidth($social, socialIncAmount); }
		incrementElementWidth($resource, resourceIncAmount + amount);
	}

	var decreaseWidth = function ( amount ) {
		// if ( $social.width() > minSocialWidth ) {  // try to descrease social to min

		// }
		// if ( viewportWidth < getTotalShowingWidth() )  { // if decreasing social isnt enough, decrease resource
			
		// }
	}

	var incrementElementWidth = function ( $el, amount ) {
		$el.width($el.width() + amount);
	}

	var createOverlay = function ( $el ) {
		var showId = "show-" + $el.attr("id");
		var overlayId = "overlay-" + $el.attr("id");
		$overlay = $("<div class='overlay' id="+ overlayId +"><span class='glyphicon glyphicon-list show' id="+ showId +"></span></div>");
		$overlay.css({
			position: "absolute",
			top: $el.position().top,
			height: $(window).height(),
			width: $el.width()
		});
		return $overlay;
	}

	var bindMinizeAndShow = function ( $el, hideId, miniWidth, showWidth ) {
		$(hideId).click(function () {
			$overlay = createOverlay($el);
			$el.append($overlay);
			$el.width(miniWidth);
			$el.find(".overlay").width(miniWidth); // for some reason the overlays were getting mixed up, look into this
			$overlay.find("span.show").one("click", function ( e ) {
				$el.find(".overlay").width(showWidth);
				$el.one("transitionend", function () { // this is a little funky, gets fired too much, think about going all JS
				  $el.find(".overlay").remove();
				});
				$el.width(showWidth);
			});
		});
	}

	bindMinizeAndShow($social, "#hide-social-content", 50, minSocialWidth);
	bindMinizeAndShow($nav, "#hide-left-nav", 50, minNavWidth);

	handleResize();
	$(window).resize(handleResize);
	$(window).on("transitionend", handleResize);
});