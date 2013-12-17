

App.Views.AnswerIndex = Backbone.View.extend({

  events: {
    'click #submit-answer': 'submit',
    'click .add-comment': 'showCommentForm'
  },

  showCommentForm: function ( e ) {
    console.log("does this highjack my events?");
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

    this.$el.html(renderedContent);

    return this;
  }

});