App.Views.DiscussionShow = Backbone.View.extend({

  template: JST['discussions/show'],

  render: function () {
    var renderedContent = this.template({ discussion: this.model });
    this.$el.html(renderedContent);
    return this;
  }

});