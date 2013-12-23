
App.Models.Answer = Backbone.Model.extend({


	parse: function ( json ) {
		json = App.Modules.parseCommentable(json, "Answer");

		return json;
	}
	

});