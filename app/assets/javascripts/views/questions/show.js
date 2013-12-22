

App.Views.QuestionShow = Backbone.View.extend({

  initialize: function ( options ) {
    this.type = "Question";
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

  renderVotes: function ( $wrapper ) {
    var votes = new App.Collections.Votes([], {voteable_id: this.model.get("id"), voteable_type: this.type });
    votes.fetch({
      success: function (collection, resp, opts) {
        var voteView = new App.Views.Vote({ collection: votes });
        $wrapper.append(voteView.render().$el);
      }
    });
  },

  reveal: function () {
    $('.show-modal').reveal();
    $(document).on('reveal:close', '.show-modal', function () { $(this).remove(); });
  }

});