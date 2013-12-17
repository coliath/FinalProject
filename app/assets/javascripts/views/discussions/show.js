App.Views.DiscussionShow = Backbone.View.extend({

  template: JST['discussions/show'],

  render: function () {
    var renderedContent = this.template({ discussion: this.model });
    this.$el.html(renderedContent);

    this.renderComments();


    return this;
  },

  renderComments: function () {
    var comments = new App.Collections.Comments([], { commentable_id: this.model.get("id"), type: "Discussion" });
    comments.fetch({
      success: function (collection, resp, opts) {
        var commentIndex = new App.Views.CommentIndex({ collection: comments });
        $('.show-modal').append(commentIndex.render().$el);
        $('.show-modal').reveal();
        $(document).on('reveal:close', '.show-modal', function () { $(this).remove(); });
      },
      error: function (collectio, resp, opts) {
        console.log(resp);
      }
    });
  }

});