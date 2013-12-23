App.Models.Question = Backbone.Model.extend({
	parse: function ( json ) {

  		json = App.Modules.parseCommentable(json, "Question");
  		json = App.Modules.parseVoteable(json, "Question");
  		json = App.Modules.parseOwnable(json);

  		json.answers = new App.Collections.Answers(json.answers, {parse: true});
  		json.answer_count = json.answers.length;

  		return json;
  	},

});