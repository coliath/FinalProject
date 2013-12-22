App.Views.DiscussionShow = Backbone.View.extend({

  initialize: function () {
    this.type = "Discussion";
    App.Modules.makeCommentable(this);
    App.Modules.makeVoteable(this);
  },

  template: JST['discussions/show'],

  render: function () {
    var renderedContent = this.template({ discussion: this.model });
    this.$el.html(renderedContent);

    this.renderComments(this.$el.find('.comments-wrapper'));
    this.renderVotes(this.$el.find('.votes-wrapper'));
    this.renderResponses();

    return this;
  },

  renderResponses: function () {
    var that = this;
    var responses = new App.Collections.Responses([], {resource_id: App.CurrentState.resource.get("id"), question_id: this.model.get("id")});
    responses.fetch({
      success: function (collection, resp, opts) {
        var responsesView = new App.Views.ResponseIndex({ collection: responses });
        $('.show-modal').append(responsesView.render().$el);
        that.reveal();
      },
      error: function (collectio, resp, opts) {
        console.log(resp);
      }
    });
  },

  reveal: function () {
    $('.show-modal').reveal();
    $(document).on('reveal:close', '.show-modal', function () { $(this).remove(); });
  }

});