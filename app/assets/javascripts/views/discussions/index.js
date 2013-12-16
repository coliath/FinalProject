App.Views.DiscussionIndex = Backbone.View.extend({

  events: {
    'click #submit-discussion': 'submit',
    'click .discussion': 'showDiscussion'
  },

  initialize: function () {
    var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
  },

  submit: function ( e ) {
    e.preventDefault();

    var attrs = $(e.target).closest('form').serializeJSON();
    attrs.discussion.resource_id = App.CurrentState.resource.get("id");

    this.collection.create(attrs, {wait: true});
  },

  showDiscussion: function ( e ) {
    var dId = $(e.target).data("discussion-id");
    var discussion = this.collection.get(dId);
    var comments = new App.Collections.Comments({ commentable_id: dId, type: "Discussion" });
    comments.fetch({
      success: function (collection, resp, opts) {
        var commentIndex = new App.Views.CommentIndex({ collection: comments });
        var discussionShow = new App.Views.DiscussionShow({ model: discussion });
        $('#content').append(discussionShow.render().$el);
        $('.show-modal').append(commentIndex.render().$el);
        $('.show-modal').reveal();
        $(document).on('reveal:close', '.show-modal', function () { $(this).remove(); });
      },
      error: function (collectio, resp, opts) {
        console.log(resp);
      }
    });
  },

  template: JST['discussions/index'],

  render: function ( hidden ) {
    if (hidden != true) { hidden = false; }

    var renderedContent = this.template({
      discussions: this.collection,
      hidden: hidden
    });

    this.$el.html(renderedContent);

    return this;
  }

});