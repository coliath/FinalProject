

App.Views.AnswerIndex = Backbone.View.extend({

  events: {
    'click #submit-answer': 'submit',

  },

  submit: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    this.collection.create(attrs, {wait: true});
    this.question.set({answer_count: this.question.get("answer_count") + 1});
  },

  initialize: function ( options ) {

    this.question = options.question;
    console.log(this.question);

  	var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
    this.listenTo(this.collection, "change", renderCB);
  },

  template: JST['answers/index'],

  render: function () {
    var renderedContent = this.template({
      answers: this.collection
    });

    this.$el.html(renderedContent);

    this.renderAnswers(this.$el.find('.answers'));

    return this;
  },

  renderAnswers: function ( $el ) {
    _.each(this.collection.models, function (model) {
      var answerView = new App.Views.AnswerShow({ model: model });
      $el.append(answerView.render().$el);
    });
  },

});