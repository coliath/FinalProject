


App.Views.DiscussionListItem = Backbone.View.extend({


	template: JST['discussions/list_item'],

	initialize: function () {
		var renderCB = this.render.bind(this);

		this.listenTo(this.model, "change", renderCB);
	},

	render: function () {
		
		var renderedContent = this.template({
			discussion: this.model
		});

		this.$el.html(renderedContent);

    	return this;
	}

});