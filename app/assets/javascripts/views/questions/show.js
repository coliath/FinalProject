App.Views.QuestionForm = Backbone.View.extend({

  template: JST['questions/show'],

  render: function () {
    var renderedContent = this.template({ question: this.model });

    this.$el.html(renderedContent);

    return this;
  }

});