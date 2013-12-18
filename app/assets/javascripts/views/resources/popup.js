App.Views.ResourcePopup = Backbone.View.extend({

  initialize: function ( options ) {
    this.highlighter = rangy.createCssClassApplier("highlighted", {normalize: true});
    this.errorizer = rangy.createCssClassApplier("marked-as-error", {normalize: true});
    this.confusingizer = rangy.createCssClassApplier("marked-as-confusing", {normalize: true});

    this.selection = options.selection;
  },

  events: {
    'click button#highlight-text': "highlightText",
    'click button#errorize-text': "errorizeText",
    'click button#confusingize-text': "confusingizeText",
    'click button#create-note-with-text': "createNoteWithText",
    'click button#ask-question-on-text': "askQuestionOnText",
    'click button#post-discussion-on-text': "postDiscussionOnText",
  },

  highlightText: function ( e ) {
    this.highlighter.toggleSelection(this.selection);
  },

  errorizeText: function ( e ) {
    this.errorizer.toggleSelection(this.selection);
  },

  confusingizeText: function ( e ) {
    this.confusingizer.toggleSelection(this.selection);
  },

  createNoteWithText: function ( e ) {
    console.log(4);
  },

  askQuestionOnText: function ( e ) {
    console.log(5);
  },

  postDiscussionOnText: function ( e ) {
    console.log(6);
  },

  template: JST['resources/popup'],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }

});