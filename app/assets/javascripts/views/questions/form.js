App.Views.QuestionForm = Backbone.View.extend({

  events: {
    'click .submit-question': 'save',
  },

  save: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    if ( this.model.isNew() ) {
      this.model.set(attrs);
      App.CurrentState.resource.questions.create(attrs, { wait: true });
    } else {
      this.model.save(attrs, {wait: true});
    }

    $('.question-modal-form').trigger("reveal:close");
    this.remove();
  },

  template: JST['questions/form'],

  render: function () {
    var renderedContent = this.template({
      question: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});