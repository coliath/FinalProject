

App.Views.AnswerForm = Backbone.View.extend({

  template: JST['answers/form'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }

});