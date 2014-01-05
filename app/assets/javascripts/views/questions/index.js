App.Views.QuestionIndex = Backbone.View.extend({

  events: {
    'click .question': 'showQuestion',
    'click #question-btn': 'createQuestion'
  },

  initialize: function () {
    var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
    this.listenTo(this.collection, "change", renderCB);
  },

  createQuestion: function () {
    var question = new App.Models.Question();
    var questionForm = new App.Views.QuestionForm({ model: question });
    $('#content').append(questionForm.render().$el);
    $('#question-form-modal').modal();
    $('#question-form-modal').on('hidden.bs.modal', function (e) { questionForm.remove(); });
  },

  showQuestion: function ( e ) {
    var qId = $(e.target).closest('li').data("question-id");
    var question = this.collection.get(qId);
    var questionShow = new App.Views.QuestionShow({model: question});


    $('#content').append(questionShow.render().$el);
    $('#question-show-modal').modal();
    $('#question-show-modal').on('hidden.bs.modal', function (e) { questionShow.remove(); });
  },

  template: JST['questions/index'],

  render: function ( hidden ) {
    if (hidden != true) { hidden = false; }

    var renderedContent = this.template({
      questions: this.collection,
      hidden: hidden
    });

    this.$el.html(renderedContent);

    this.renderListItems(this.$el.find('ul.social-list'));

    return this;
  },

  renderListItems: function ( $wrapper ) {
    this.collection.each(function (question) {
      var itemView = new App.Views.QuestionListItem({ model: question });
      $wrapper.append(itemView.render().$el);
    });
    $(window).trigger("resize");
  }


});