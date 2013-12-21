App.Views.CommentIndex = Backbone.View.extend({

  events: {
    'submit': 'submit',
  },

  submit: function ( e ) {

    e.preventDefault();
    e.stopPropagation();

    var attrs = $(e.target).closest('form').serializeJSON();
    attrs.comment.commentable_id = this.collection.commentableId;
    attrs.comment.commentable_type = this.collection.commentable_type;

    var that = this;
    this.collection.create(attrs, {
      wait: true,
      success: function (model, resp, opts) {
        that.fadeInComment(model.get("body"));
      }
    });
  },

  initialize: function ( collection ) {
  	var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "remove", renderCB);
  },

  focus: function () {
    this.$el.find('input').focus();
  },

  fadeInComment: function ( body ) {
    $li = $('<li class="comment">'+ body +'</li>');
    $ul = this.$el.find('ul.comments');
    $input = this.$el.find('.comment-form input');
    $input.addClass("become-comment");
    $input.one('webkitTransitionEnd transitionend', function () {
      $ul.children().last().replaceWith($li);
    });
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