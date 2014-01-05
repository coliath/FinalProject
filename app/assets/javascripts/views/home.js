App.Views.Home = Backbone.View.extend({

	events: {
		'click .resource-link': 'read'
	},

	read: function ( e ) {
		var resourceId = $(e.target).closest("div").data("resource-id");
		window.location.hash = "resources/" + resourceId;
	},
	
	template: JST['home'],

    render: function () {
    	var renderedContent = this.template();
        this.$el.html(renderedContent);
   		return this;
    }


});