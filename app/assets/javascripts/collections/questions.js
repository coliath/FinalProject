App.Collections.Questions = Backbone.Collection.extend({

  model: App.Models.Question,

  initialize: function (models, options) {
  	if ( options ) {
  	  this.resource_id = options.resource_id;
  	}
  },

  url: function () {
    return "/resources/" + this.resource_id + "/questions"
  },

});