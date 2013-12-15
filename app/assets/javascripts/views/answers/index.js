

App.Views.AnswerIndex = Backbone.View.extend({

  events: {
    'click #submit-answer': 'submit',
  },

  submit: function ( e ) {
    e.preventDefault();

    var attrs = $(e.target).closest('form').serializeJSON();

    console.log(attrs);
    //attrs.answer.question_id = App.CurrentState.question.get("id");

    //App.CurrentState.question.answers.create(attrs, {wait: true});
  },

  initialize: function () {

  },

  template: JST['answers/index'],

  render: function () {
    var renderedContent = this.template({
      answers: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }

});