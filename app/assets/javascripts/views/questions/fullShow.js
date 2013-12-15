App.Views.QuestionFullShow = Backbone.View.extend({

  template: JST['questions/fullShow'],

  render: function () {
    var renderedContent = this.template({ question: this.model });

    this.$el.html(renderedContent);

    return this;
  }

});