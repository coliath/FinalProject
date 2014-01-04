



$(document).on("loaded", function () {

	// there is probably a much more elegant and smooth solution to this, but im outa time!

	var ResizableElement = function ( $el, widthOptions, $heightEl, hidable, bottomOffset ) {
		this.$el = $el;
		this.widthOptions = widthOptions;
		this.hidable = hidable;
		this.$heightEl = $heightEl;
		if ( typeof bottomOffset != "number" ) { bottomOffset = 0; }
		this.bottomOffset = bottomOffset;
		this.showBtnId = "show-" + $el.attr("id");

		$("#hide-" + $el.attr("id")).click(this.hideAndBindShow.bind(this));
	}

	_.extend(ResizableElement.prototype, {

		getWidth: function () {
			return this.$el.outerWidth();
		},

		setWidth: function ( newWidth ) {
			this.$el.width(newWidth);
		},

		incrementWidth: function ( amount ) {
			var oldWidth = this.$el.width();
			this.$el.width(oldWidth + amount);
		},

		nextWidthIdx: function () {
			for  (var i = 0; i < this.widthOptions.length; i++) {
				if ( this.widthOptions[i] > this.getWidth() ) {
					return i;
				}
			}
			return this.widthOptions.length;
		},

		nextWidth: function () {
			return this.widthOptions[this.nextWidthIdx()];
		},

		resetWidth: function () {
			if ( this.showing() ) { this.setWidth(this.widthOptions[0]); }
		},

		resizeHeight: function () {
			var viewportHeight = $(window).height();
			var that = this;
			_.each(this.$heightEl, function (el) {
				$(el).height(viewportHeight - $(el).position().top - that.bottomOffset);
			});
		},

		showing: function () {
			if ( this.$el.find(".show").length && this.hidable ) { return false; }
			return true;
		},

		canExpand: function () {
			return (this.showing() && (this.getWidth() < this.maxWidth));
		},

		applyOverlay: function () {
			var showId = "show-" + this.$el.attr("id");
			var overlayId = "overlay-" + this.$el.attr("id");
			$overlay = $("<div class='overlay'><span class='glyphicon glyphicon-list show' id="+ this.showBtnId +"></span></div>");
			$overlay.css({
				position: "absolute",
				top: this.$el.position().top,
				height: $(window).height(),
				width: this.$el.width()
			});
			this.$el.append($overlay);
		},

		hideAndBindShow: function () {
			if ( !this.hidable ) { return; }

			var oldWidth = this.getWidth()
			this.applyOverlay();
			this.setWidth(50);
			this.$el.find(".overlay").width(50);

			var that = this;
			$("#" + this.showBtnId).one("click", function () {
				that.$el.find(".overlay").width(oldWidth);
				that.setWidth(oldWidth);
				that.$el.one("transitionend", function () { // this is a little funky, gets fired for both and is hard to specify, think about going all JS
				  that.$el.find(".overlay").remove();
				});
			});
		}

	});

	var nav = new ResizableElement($("#left-nav"), [200,200,200,200], $("#table-of-contents").find("ul"), true);
	var social = new ResizableElement($("#social-content"), [280, 300, 450, 600], $("#social-content").find(".social-list"), true, 33);
	var resource = new ResizableElement($("#resource-content"), [420, 700, 900, 2000], $("#resource-content").find(".resource"), false);

	var resizables = [resource, social, nav];

	var handleResize = function () {
		setHeights();
		setWidths();
	}

	var setHeights = function () {
		$("#content").height($(window).height());
		_.each(resizables, function (resizable) { resizable.resizeHeight(); });
	}

	var getTotalShowingWidth = function () {
		var totalwidth = 0;
		_.each(resizables, function (resizable) {
			totalwidth += resizable.getWidth();
		});
		return totalwidth;
	}

	var setWidths = function () {
		var viewportWidth = $(window).width();
		var deltaWidth = viewportWidth - getTotalShowingWidth();
		if ( deltaWidth > 0 ) { 
			increaseWidths(deltaWidth);
		} else if ( deltaWidth < 0 ){ 
			decreaseWidths(deltaWidth);
		}
	}

	var increaseWidths = function ( amount ) {
		if ( resource.nextWidthIdx() > social.nextWidthIdx() && social.canExpand() ) {
			var elToIncrease = social;
		} else {
			var elToIncrease = resource;
		}
		if ( typeof elToIncrease.nextWidth() === "undefined" ) { return; }
		if ( getTotalShowingWidth() >= $(window).width() - 1) { return; }
		var widthDifference = elToIncrease.nextWidth() - elToIncrease.getWidth();
		if ( widthDifference < amount ) {
			elToIncrease.incrementWidth(widthDifference);
			amount = amount - widthDifference;
			elToIncrease.$el.one("transitionend", function () {
				increaseWidths(amount);
			});
		} else {
			var finalIncreaseAmount = $(window).width() - getTotalShowingWidth()
			elToIncrease.incrementWidth(finalIncreaseAmount);
		}
	}

	var decreaseWidths = function ( amount ) {
		console.log("toosmall");
		resource.resetWidth();
		social.resetWidth();
	}

	handleResize();
	$(window).resize(handleResize);
	$(window).on("transitionend", handleResize);
});