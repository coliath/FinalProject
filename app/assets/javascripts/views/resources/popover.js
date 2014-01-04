App.Views.ResourcePopover = Backbone.View.extend({

  initialize: function ( options ) {

    this.highlighter = rangy.createCssClassApplier("highlighted", {normalize: true});
    this.errorizer = rangy.createCssClassApplier("marked-as-error", {normalize: true});
    this.confusingizer = rangy.createCssClassApplier("marked-as-confusing", {normalize: true});

    this.selection = options.selection;
    this.sectionId = options.sectionId;
    this.selectionHtml = options.selectionHtml;
    this.selectionText = options.selectionText;
  },

  events: {
    'click button': 'handleButtonClick'
  },

  handleButtonClick: function ( e ) {
    var id = $(e.target).attr("id");

    switch(id)
    {
    case "highlight-text":
      this.highlighter.applyToSelection(this.selection);
      this.createHighlight("Highlight");
      break;
    case "errorize-text":
      this.errorizer.applyToSelection(this.selection);
      this.createHighlight("Error");
      break;
    case "confusingize-text":
      this.confusingizer.applyToSelection(this.selection);
      this.createHighlight("Confusing");
      break;
    case "create-note-with-text":
      this.createNoteWithText();
      break;
    case "ask-question-on-text":
      this.askQuestionOnText();
      break;
    case "post-discussion-on-text":
      this.postDiscussionOnText();
      break;
    }

    this.trigger('actionTaken');  // resource view will remove this
  },

  parseSelection: function ( selectionHtml ) {
    var fullText = _.clone(selectionHtml);
    var texts = [];
    _.each(fullText.split('</p><p>'), function (text) {
      var tagReg = /(<([^>]+)>)/ig
      text = text.replace(tagReg, ''); // remove all tags!!!!
      texts.push(text);
    });

    return texts;
  },

  createHighlight: function ( type ) {
    var attrs = {}
    attrs.section_id = this.sectionId;
    attrs.full_text = this.selectionText;
    attrs.highlight_type = type;
    attrs.marks = this.parseSelection(this.selectionHtml);
    App.CurrentState.resource.highlights.create(attrs, {
      error: function (collection, resp, opts) {
        console.log(resp);
        console.log(collection);
      }
    });
  },
  // DRY THIS UP when you get the chance
  createNoteWithText: function ( e ) {
    App.socialNav.showNotes();
    var note = new App.Models.Note({section_text: this.selectionText});
    var noteModalForm = new App.Views.NoteForm({ model: note });
    $('#content').append(noteModalForm.render().$el);
    $('.note-modal-form').reveal();
    $(document).on('reveal:close', '.note-modal-form', function () { $(this).remove(); });
  },

  askQuestionOnText: function ( e ) {
    App.socialNav.showQuestions();
    var question = new App.Models.Question({ section_text: this.selectionText });
    var questionForm = new App.Views.QuestionForm({ model: question });
    $('#content').append(questionForm.render().$el);
    $('.question-modal-form').reveal();
    $(document).on('reveal:close', '.question-modal-form', function () { $(this).remove(); });
  },

  postDiscussionOnText: function ( e ) {
    App.socialNav.showDiscussions();
    var discussion = new App.Models.Discussion({ section_text: this.selectionText });
    var discussionForm = new App.Views.DiscussionForm({ model: discussion });
    $('#content').append(discussionForm.render().$el);
    $('.discussion-modal-form').reveal();
    $(document).on('reveal:close', '.discussion-modal-form', function () { $(this).remove(); });
  },

  template: JST['resources/popup'],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }

});