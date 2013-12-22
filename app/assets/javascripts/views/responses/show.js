App.Views.ResponseShow = Backbone.View.extend({

  initialize: function () {
    this.type = "Response"
    App.Modules.makeCommentable(this);
    App.Modules.makeVoteable(this);
  },

  template: JST['responses/show'],

  render: function () {
    var renderedContent = this.template({ response: this.model });
    this.$el.html(renderedContent);

    this.renderComments(this.$el.find('.comments-wrapper'));
    this.renderVotes(this.$el.find('.votes-wrapper'));

    return this;
  },

});