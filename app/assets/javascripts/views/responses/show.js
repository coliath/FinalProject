App.Views.ResponseShow = Backbone.View.extend({

  initialize: function () {
    this.type = "Response"
    App.Modules.makeCommentable(this);
  },

  template: JST['responses/show'],

  render: function () {
    var renderedContent = this.template({ response: this.model });
    this.$el.html(renderedContent);

    this.renderComments(this.$el.find('.comments-wrapper'));

    return this;
  },

});