App.Views.QuestionIndex = Backbone.View.extend({

  events: {
    'click #submit-question': 'submit',
    'click .question': 'showQuestion',
  },

  initialize: function () {
    var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
    this.listenTo(this.collection, "change", renderCB);
  },

  submit: function ( e ) {
    e.preventDefault();

    var attrs = $(e.target).closest('form').serializeJSON(); // this is a good place for a view prototype getFormData Function
    attrs.question.resource_id = App.CurrentState.resource.get("id");

    this.collection.create(attrs, {
      wait: true,
      error: function (model, resp, opts) {
        console.log(resp);
      }
    });
  },

  showQuestion: function ( e ) {
    var qId = $(e.target).closest('li').data("question-id");
    var question = this.collection.get(qId);
    var showView = new App.Views.QuestionShow({model: question});

    showView.render();
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