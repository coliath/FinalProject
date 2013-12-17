App.Views.DiscussionShow = Backbone.View.extend({

  template: JST['discussions/show'],

  render: function () {
    var renderedContent = this.template({ discussion: this.model });
    this.$el.html(renderedContent);

    this.renderResponses();

    return this;
  },

  renderResponses: function () {
    var responses = new App.Collections.Comments([], { commentable_id: this.model.get("id"), type: "Discussion" });
    responses.fetch({
      success: function (collection, resp, opts) {
        var responsesView = new App.Views.Responses({ collection: responses });
        $('.show-modal').append(responsesView.render().$el);
        $('.show-modal').reveal();
        $(document).on('reveal:close', '.show-modal', function () { $(this).remove(); });
      },
      error: function (collectio, resp, opts) {
        console.log(resp);
      }
    });
  }

});