App.Views.QuestionListItem = Backbone.View.extend({


	template: JST['questions/list_item'],

	initialize: function () {
		var renderCB = this.render.bind(this);

		this.listenTo(this.model, "change", renderCB);
	},

	render: function () {
		
		var renderedContent = this.template({
			question: this.model
		});

		this.$el.html(renderedContent);

    	return this;
	}

});