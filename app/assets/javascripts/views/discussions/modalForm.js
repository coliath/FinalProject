App.Views.DiscussionModalForm = Backbone.View.extend({

  initialize: function ( options ) {
    this.selectionText = options.selectionText;
  },

  events: {
    'click .submit-discussion': 'save',
  },

  save: function ( e ) {
    e.preventDefault();
    var attrs = $(e.target).closest('form').serializeJSON();
    App.CurrentState.resource.discussions.create(attrs, {
      wait: true,
      error: function (discussion, resp, opts) {
        console.log(resp);
      }
    });
    this.remove();
    $('.discussion-modal-form').trigger("reveal:close");
  },

  template: JST['discussions/modal-form'],

  render: function () {
    var renderedContent = this.template({
      selectionText: this.selectionText
    });
    this.$el.html(renderedContent);
    return this;
  }

});