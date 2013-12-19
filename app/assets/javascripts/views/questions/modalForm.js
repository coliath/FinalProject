App.Views.QuestionModalForm = Backbone.View.extend({

  initialize: function ( options ) {
    this.selectionText = options.selectionText;
  },

  events: {
    'click .submit-question': 'save',
  },

  save: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    App.CurrentState.resource.questions.create(attrs, {
      wait: true,
      error: function (question, resp, opts) {
        console.log(resp);
      }
    });
    this.remove();
    $('.question-modal-form').trigger("reveal:close");
  },

  template: JST['questions/modal-form'],

  render: function () {
    var renderedContent = this.template({
      selectionText: this.selectionText
    });
    this.$el.html(renderedContent);
    return this;
  }
});