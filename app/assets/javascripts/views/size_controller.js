



$(document).on("loaded", function () {

	var minResourceWidth = 480;
	var stnResourceWidth = 800;
	var minNavWidth = 200;
	var minSocialWidth = 280;

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

		console.log(getTotalShowingWidth());

		// make this a little less narly 
		if ( deltaWidth > 0 ) { //things need to get bigger
			if ( $social.width() > 50 ) { // try to increase social if showing
				console.log("increase social size");
			} else { // otherwise increase the resource size

			}
		} else { //things need to get smaller
			if ( $social.width() > minSocialWidth ) {  // try to descrease social to min

			}
			if ( viewportWidth < getTotalShowingWidth() )  { // if decreasing social isnt enough, decrease resource
				
			}
		}
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
				  handleResize();
				});
				$el.width(showWidth);
			});
		});

		handleResize();
	}

	bindMinizeAndShow($social, "#hide-social-content", 50, minSocialWidth);
	bindMinizeAndShow($nav, "#hide-left-nav", 50, minNavWidth);

	handleResize();
	$(window).resize(handleResize);


});