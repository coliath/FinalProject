App.Views.QuestionIndex = Backbone.View.extend({

  events: {
    'click #submit-question': 'submit',
    'click .question': 'showQuestion'
  },

  initialize: function () {
    var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
  },

  submit: function ( e ) {
    e.preventDefault();

    var attrs = $(e.target).closest('form').serializeJSON(); // this is a good place for a view prototype getFormData Function
    attrs.question.resource_id = App.CurrentState.resource.get("id");

    App.CurrentState.resource.questions.create(attrs, {wait: true});
  },

  showQuestion: function ( e ) {

    var qId = $(e.target).data("question-id");

    var question = App.CurrentState.resource.questions.get(qId);
    var showView = new App.Views.QuestionShow({model: question});
    App.CurrentState.resource.answers = new App.Collections.Answers([],{resource_id: App.CurrentState.resource.get("id"), question_id: question.get("id")});
    App.CurrentState.resource.answers.fetch({
      success: function (collection, resp, opts) {
        $('#content').append(showView.render().$el); // hidden by default
        var answersIndex = new App.Views.AnswerIndex({collection: App.CurrentState.resource.answers});
        $('.show-modal').append(answersIndex.render().$el);
        $('.show-modal').reveal();
        $(document).on('reveal:close', '.show-modal', function () { $(this).remove(); });
      }
    });
  },

  template: JST['questions/index'],

  render: function ( hidden ) {
    if (hidden != true) { hidden = false; }

    var renderedContent = this.template({
      questions: this.collection,
      hidden: hidden
    });

    this.$el.html(renderedContent);

    return this;
  }

});