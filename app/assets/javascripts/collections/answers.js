

App.Collections.Answers = Backbone.Collection.extend({

  model: App.Models.Answer,

  initialize: function (models, options) {
  	if ( options ) {
  	    this.resource_id = options.resource_id;
  	    this.question_id = options.question_id;
  	}
  },

  url: function () {
    return "/resources/" + this.resource_id + "/questions/" + this.question_id + "/answers";
  }

});

