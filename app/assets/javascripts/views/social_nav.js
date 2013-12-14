App.Views.SocialNav = Backbone.View.extend({

  events: {
    "click #show-notes": "showNotes",
    "click #show-questions": "showQuestions",
    "click #hide-social": "hideSocial",
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
    var that = this;
    $("#social-content").slideUp("fast", function () {
      $("#social-content").prev().append('<span class="show" id="show-social"></span>');
      $("#show-social").click(that.showSocial);
    });
  },

  showSocial: function ( e ) {
    $("#show-social").remove();
    $("#social-content").slideDown("fast");
  },

  template: JST['social_nav'],

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }

});