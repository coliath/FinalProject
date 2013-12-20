

App.Views.QuestionShow = Backbone.View.extend({

  initialize: function ( options ) {

  },

  events: {
    'click .add-comment': 'showCommentForm'
  },

  showCommentForm: function ( e ) {
    this.commentsIndex.render();
  },

  template: JST['questions/show'],

  render: function () {
    var renderedContent = this.template({ question: this.model });
    this.$el.html(renderedContent);

    this.renderComments(this.$el.find('.comments-wrapper'));

    $('#content').append(this.$el);
    this.renderAnswers();
    return this;
  },

  renderAnswers: function () {
    var that = this;
    var answers = new App.Collections.Answers([],{resource_id: App.CurrentState.resource.get("id"), question_id: this.model.get("id")});
    answers.fetch({
      success: function (collection, resp, opts) {
        var answersIndex = new App.Views.AnswerIndex({ collection: answers });
        $('.show-modal').append(answersIndex.render().$el);
        that.reveal();
      },
    });
  },

  renderComments: function ( $el ) {
    var that = this;
    this.comments = new App.Collections.Comments([], { commentable_id: this.model.get("id"), type: "Question" })
    this.comments.fetch({
      success: function (collection, resp, opts) {
        that.commentsIndex = new App.Views.CommentIndex({ collection: that.comments });
        $el.append(that.commentsIndex.render({ form: false }).$el);
      },
      error: function (something, resp, opts) {
        console.log("ERROR");
        console.log(resp);
      }
    });
  },

  reveal: function () {
    $('.show-modal').reveal();
    $(document).on('reveal:close', '.show-modal', function () { $(this).remove(); });
  }

});