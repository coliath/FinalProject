App.Views.QuestionForm = Backbone.View.extend({

  template: JST['questions/form'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }

});