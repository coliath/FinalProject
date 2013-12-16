

App.Collections.Comments = Backbone.Collection.extend({

  model: App.Models.Comment,

  initialize: function (options) {
    this.commentable_id = options.commentable_id;
    this.commentable_type = options.type;
  },

  url: function () {
    return "/comments?type=" + this.commentable_type + "&id=" + this.commentable_id;
  }

});