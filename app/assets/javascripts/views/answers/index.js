

App.Views.AnswerIndex = Backbone.View.extend({

  events: {
    'click #submit-answer': 'submit',
  },

  submit: function ( e ) {
    e.preventDefault();

    var attrs = $(e.target).closest('form').serializeJSON();

    App.CurrentState.resource.answers.create(attrs, {wait: true});
  },

  initialize: function () {
  	var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
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