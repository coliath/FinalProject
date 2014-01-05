App.Views.DiscussionIndex = Backbone.View.extend({

  events: {
    'click .discussion': 'showDiscussion',
    'click #discussion-btn': 'createDiscussion'
  },

  initialize: function () {
    var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
  },

  createDiscussion: function () {
    var discussion = new App.Models.Discussion();
    var discussionForm = new App.Views.DiscussionForm({ model: discussion });
    $('#content').append(discussionForm.render().$el);
    $('#discussion-form-modal').modal();
    $('#discussion-form-modal').on('hidden.bs.modal', function (e) { discussionForm.remove(); });
  },

  showDiscussion: function ( e ) {
    var dId = $(e.target).closest('li').data("discussion-id");
    var discussion = this.collection.get(dId);
    var discussionShow = new App.Views.DiscussionShow({ model: discussion });
    $('#content').append(discussionShow.render().$el);
  },

  template: JST['discussions/index'],

  render: function ( hidden ) {
    if (hidden != true) { hidden = false; }

    var renderedContent = this.template({
      discussions: this.collection,
      hidden: hidden
    });

    this.$el.html(renderedContent);

    this.renderListItems(this.$el.find('ul.social-list'));

    return this;
  },

  renderListItems: function ( $wrapper ) {
    this.collection.each(function (discussion) {
      var itemView = new App.Views.DiscussionListItem({ model: discussion });
      $wrapper.append(itemView.render().$el);
    });
    $(window).trigger("resize");
  }

});