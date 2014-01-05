App.Views.DiscussionShow = Backbone.View.extend({

  initialize: function () {
    this.type = "Discussion";
    App.Modules.makeCommentable(this);
    App.Modules.makeVoteable(this);
  },

  template: JST['discussions/show'],

  render: function () {

    var renderedContent = this.template({ discussion: this.model });
    this.$el.html(renderedContent);
    this.renderComments(this.$el.find('.comments-wrapper'));
    this.renderVotes(this.$el.find('.votes-wrapper'));
    this.renderResponses(this.$el.find('.show-modal'));

    return this;
  },

  renderResponses: function ( wrapper ) {
    var responsesIndex = new App.Views.ResponseIndex({ collection: this.model.get('responses'), discussion: this.model });
    $(wrapper).append(responsesIndex.render().$el);
  },

});