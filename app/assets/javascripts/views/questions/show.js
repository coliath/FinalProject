

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
    this.renderAnswers(this.$el.find('.show-modal'));

    return this;
  },

  renderAnswers: function ( wrapper ) {
    var answersIndex = new App.Views.AnswerIndex({ collection: this.model.get("answers"), question: this.model });
    wrapper.append(answersIndex.render().$el);
  }

});