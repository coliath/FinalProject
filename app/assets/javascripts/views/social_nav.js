App.Views.SocialNav = Backbone.View.extend({

  events: {
    "click #show-notes": "showNotes",
    "click #show-questions": "showQuestions",
    "click #show-discussions": "showDiscussions",
  },

  initialize: function () {
    this.views = [".notes", ".questions", ".discussions"];
    this.buttons = ["#show-notes", "#show-questions", "#show-discussions"];
  },

  _swapView: function ( button_id, element_class ) { // should i change these all to ids???
    _.each(this.views, function (view) {
      $(view).hide();
    });
    _.each(this.buttons, function (button) {
      $(button).removeClass("selected-social-btn");
    });

    $(element_class).show();
    $(button_id).addClass("selected-social-btn");
    $(document).trigger("resize");
  },

  showNotes: function ( e ) {
    this._swapView("#show-notes", ".notes");
  },

  showQuestions: function ( e ) {
    this._swapView("#show-questions", ".questions");
  },

  showDiscussions: function ( e ) {
    this._swapView("#show-discussions", ".discussions");
  },

  template: JST['social_nav'],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }

});