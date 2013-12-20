App.Views.AnswerShow = Backbone.View.extend({

  events: {
    "click .add-comment": "showCommentForm"
  },

  showCommentForm: function ( e ) {
    e.stopPropagation();
    console.log("comment on answer");
    this.commentIndex.render();
  },

  template: JST['answers/show'],

  render: function () {
    var renderedContent = this.template({ answer: this.model });
    this.$el.html(renderedContent);

    this.renderComments(this.$el.find('.comments-wrapper'));

    return this;
  },

  renderComments: function ( $el ) {
    var that = this;
    this.comments = new App.Collections.Comments([], { commentable_id: this.model.get("id"), type: "Answer" })
    this.comments.fetch({
      success: function (collection, resp, opts) {
        that.commentIndex = new App.Views.CommentIndex({ collection: that.comments });
        $el.append(that.commentIndex.render({ form: false }).$el);
      },
      error: function (something, resp, opts) {
        console.log("ERROR");
        console.log(resp);
      }
    });
  },

});