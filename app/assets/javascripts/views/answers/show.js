App.Views.AnswerShow = Backbone.View.extend({

  template: JST['answers/show'],



  render: function () {
    var renderedContent = this.template({ answer: this.model });
    this.$el.html(renderedContent);


    return this;
  }

});