

App.Collections.Answers = Backbone.Collection.extend({

  model: App.Models.Answer,

  initialize: function (models, options) {
    this.commentable_id = options.id;
    this.commentable_type = options.type;
  },

  url: 'notes'

});