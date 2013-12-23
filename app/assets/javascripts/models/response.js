App.Models.Response = Backbone.Model.extend({


	parse: function ( json ) {
		json = App.Modules.parseCommentable(json, "Response");

		return json;
	}

});