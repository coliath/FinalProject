App.Collections.Responses = Backbone.Collection.extend({

  model: App.Models.Response,

  initialize: function (models, options) {
    this.resource_id = options.resource_id;
    this.discussion_id = options.question_id;
  },

  url: function () {
    return "/resources/" + this.resource_id + "/discussions/" + this.discussion_id + "/responses";
  }

});