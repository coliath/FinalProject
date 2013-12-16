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
    var discussionId = $(e.target).data("discussion-id");

    var discussion = App.CurrentState.resource.discussions.get(discussionId);
    var fullView = new App.Views.DiscussionShow({ model: discussion });

    $('#content').append(fullView.render().$el);
    $('.show-modal').reveal();
    $(document).on('reveal:close', '.show-modal', function () { $(this).remove(); });
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