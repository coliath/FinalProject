

App.Views.QuestionShow = Backbone.View.extend({

  initialize: function ( options ) {

  },

  events: {
    'click .add-comment': 'showCommentForm'
  },

  showCommentForm: function ( e ) {
    console.log("WHERES THE FORM")
    e.preventDefault();

    this.commentsIndex.render();
    console.log(this.commentsIndex);
  },

  template: JST['questions/show'],

  render: function () {
    var renderedContent = this.template({ question: this.model });
    this.$el.html(renderedContent);
    $('#content').append(this.$el);

    this.renderAnswers();
    this.renderComments();

    return this;
  },

  renderAnswers: function () {
    var answers = new App.Collections.Answers([],{resource_id: App.CurrentState.resource.get("id"), question_id: this.model.get("id")});

    answers.fetch({
      success: function (collection, resp, opts) {
        var answersIndex = new App.Views.AnswerIndex({collection: answers});
        $('.show-modal').append(answersIndex.render().$el);
      },
    });
  },

  renderComments: function () {
    var that = this;
    this.comments = new App.Collections.Comments([], {commentable_id: this.model.get("id"), type: "Question"})
    this.comments.fetch({
      success: function (collection, resp, opts) {
        that.commentsIndex = new App.Views.CommentIndex({collection: that.comments});
        $('div.body-wrapper').append(that.commentsIndex.render({form: false}).$el);
        $('.show-modal').reveal();
        $(document).on('reveal:close', '.show-modal', function () { $(this).remove(); });
      },
      error: function (something, resp, opts) {
        console.log("ERROR");
        console.log(resp);
      }
    });
  }

});