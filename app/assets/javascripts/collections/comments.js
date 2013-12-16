

App.Collections.Comments = Backbone.Collection.extend({

  model: App.Models.Comment,

  initialize: function (models, options) {
    this.commentable_id = options.id;
    this.commentable_type = options.type;
  },

  url: '/notes'

});