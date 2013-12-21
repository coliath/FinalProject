App.Views.ResponseForm = Backbone.View.extend({

  template: JST['responses/form'],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }

});