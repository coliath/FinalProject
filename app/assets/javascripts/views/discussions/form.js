App.Views.DiscussionForm = Backbone.View.extend({

  template: JST['discussions/form'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }

});