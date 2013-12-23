

App.Collections.Comments = Backbone.Collection.extend({

  model: App.Models.Comment,

  initialize: function ( models, options ) {
    if ( options ) {
      this.commentable_id = options.commentable_id;
      this.commentable_type = options.commentable_type;
    }
  },

  comparator: function ( comment ) {
    return comment.get("created_at");
  },

  url: function () {
    return "/comments?type=" + this.commentable_type + "&id=" + this.commentable_id;
  }

});