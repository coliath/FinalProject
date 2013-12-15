App.Views.QuestionIndex = Backbone.View.extend({

  events: {
    'click #submit-question': 'submit',
    'click .question': 'showFullQuestion'
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

  showFullQuestion: function ( e ) {



    var qid = $(e.target).data("question-id");

    var question = App.CurrentState.resource.questions.get(qid);
    var fullView = new App.Views.QuestionFullShow({model: question});

    $('#content').append(fullView.render().$el);


    $('.question-modal').reveal({
      animation: 'fadeAndPop',                   //fade, fadeAndPop, none
      animationspeed: 300,                       //how fast animtions are
      closeonbackgroundclick: true,              //if you click background will modal close?
      dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
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