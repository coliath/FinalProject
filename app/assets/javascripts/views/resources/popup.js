App.Views.ResourcePopup = Backbone.View.extend({

  initialize: function ( options ) {

    this.highlighter = rangy.createCssClassApplier("highlighted", {normalize: true});
    this.errorizer = rangy.createCssClassApplier("marked-as-error", {normalize: true});
    this.confusingizer = rangy.createCssClassApplier("marked-as-confusing", {normalize: true});

    this.sectionId = options.sectionId;
    this.selectionHtml = options.selectionHtml;
    this.selectionText = options.selectionText;
    this.sectionEl = $('.section[data-section-id="1"]')[0];
  },

  events: {
    'click button#highlight-text': "highlightText",
    'click button#errorize-text': "errorizeText",
    'click button#confusingize-text': "confusingizeText",
    'click button#create-note-with-text': "createNoteWithText",
    'click button#ask-question-on-text': "askQuestionOnText",
    'click button#post-discussion-on-text': "postDiscussionOnText",
  },

  parseSelection: function ( selectionHtml ) {
    var fullText = _.clone(selectionHtml);
    var texts = [];
    _.each(fullText.split('</p><p>'), function (text) {  // this should be a regex but deadline approaches!
      text = text.replace('<p>', ''); // needs to remove all tags!!!!
      text = text.replace('</p>', '');
      texts.push(text);
    });

    return texts;
  },

  highlightText: function ( e ) {
    var attrs = {}
    attrs.section_id = this.sectionId;
    attrs.full_text = this.selectionText;
    attrs.highlight_type = "Highlight";
    attrs.marks = this.parseSelection(this.selectionHtml);
    App.CurrentState.resource.highlights.create(attrs, {
      success: function (collection, resp, opts) {
        console.log(resp);
        console.log(collection);
      },
      error: function (collection, resp, opts) {
        console.log(resp);
        console.log(collection);
      }
    });
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