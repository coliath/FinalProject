App.Views.ResponseIndex = Backbone.View.extend({

  events: {
    'click #submit-response': 'submit',
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

  template: JST['responses/index'],

  render: function () {
    var renderedContent = this.template({
      responses: this.collection
    });

    this.$el.html(renderedContent);

    this.renderResponses(this.$el.find('.responses'));

    return this;
  },

  renderResponses: function ( $el ) {
    _.each(this.collection.models, function (model) {
      var responseView = new App.Views.ResponseShow({ model: model });
      $el.append(responseView.render().$el);
    });
  },

});