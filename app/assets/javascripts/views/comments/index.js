App.Views.CommentIndex = Backbone.View.extend({

  events: {
    'click #submit-comment': 'submit',
  },

  submit: function ( e ) {
    e.preventDefault();

    var attrs = $(e.target).closest('form').serializeJSON();
    attrs.comment.commentable_id = this.collection.commentableId;
    attrs.comment.commentable_type = this.collection.commentable_type;

    this.collection.create(attrs, {
      wait: true,
      error: function (model, resp, opts) {
        console.log(resp);
      }
    });
  },

  initialize: function ( collection ) {
  	var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
  },

  template: JST['comments/index'],

  render: function ( options ) {
    var form = (typeof options === "undefined") ? true : options.form;

    var renderedContent = this.template({
      comments: this.collection,
      form: form
    });

    this.$el.html(renderedContent);

    return this;
  }

});