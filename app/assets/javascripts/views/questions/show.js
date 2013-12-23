

App.Views.QuestionShow = Backbone.View.extend({

  initialize: function ( options ) {
    this.type = "Question";
    App.Modules.makeVoteable(this);
    App.Modules.makeCommentable(this);
  },

  template: JST['questions/show'],

  render: function () {

    var renderedContent = this.template({ question: this.model });
    this.$el.html(renderedContent);

    this.renderComments(this.$el.find('.comments-wrapper'));
    this.renderVotes(this.$el.find('.votes-wrapper'));

    $('#content').append(this.$el);
    this.renderAnswers();

    return this;
  },

  renderAnswers: function () {
    var answersIndex = new App.Views.AnswerIndex({ collection: this.model.get("answers") });
    $('.show-modal').append(answersIndex.render().$el);
    this.reveal();
  },

  reveal: function () {
    $('.show-modal').reveal();
    $(document).on('reveal:close', '.show-modal', function () { $(this).remove(); });
  }

});