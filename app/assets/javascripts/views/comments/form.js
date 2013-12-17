

App.Views.CommentForm = Backbone.View.extend({

  template: JST['comments/form'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }

});