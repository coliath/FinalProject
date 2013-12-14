App.Views.SocialNav = Backbone.View.extend({

  events: {
    "click #show-notes":     "showNotes",
    "click #show-questions": "showQuestions",
    "click .hide":           "hideSocial",
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
      $(button).removeClass("selected");
    });

    $(element_class).show();
    $(button_id).addClass("selected");
  },

  showNotes: function ( e ) {
    this._swapView("#show-notes", ".notes");
  },

  showQuestions: function ( e ) {
    this._swapView("#show-questions", ".questions");
  },

  hideSocial: function ( e ) {
    $("#social-content").slideUp("fast");
  },

  template: JST['social_nav'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }

});