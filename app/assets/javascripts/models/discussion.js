App.Models.Discussion = Backbone.Model.extend({

	parse: function ( json ) {

  		json = App.Modules.parseCommentable(json, "Discussion");
  		json = App.Modules.parseVoteable(json, "Discussion");
  		json = App.Modules.parseOwnable(json);

  		json.responses = new App.Collections.Responses(json.responses, {parse: true});
  		json.response_count = json.responses.length;

  		return json;
  	},

});