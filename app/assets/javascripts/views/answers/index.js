

App.Views.AnswerIndex = Backbone.View.extend({

  events: {
    'click #submit-answer': 'submit',
    'click .add-comment': 'showCommentForm',
    'click .submit-comment': 'submitComment'
  },

  showCommentForm: function ( e ) {
    e.stopPropagation();
    var answerId = $(e.target).data("answer-id");
    var answer = this.collection.get(answerId);
    console.log(answer);
  },

  submit: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    this.collection.create(attrs, {wait: true});
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

    //this.renderAnswers();

    this.$el.html(renderedContent);

    this.renderAnswers(this.$el.find('.answers'));

    return this;
  },

  renderAnswers: function ( $el ) {
    _.each(this.collection.models.reverse(), function (model) {
      var answerView = new App.Views.AnswerShow({ model: model });
      $el.append(answerView.render().$el);
    });
  },

});