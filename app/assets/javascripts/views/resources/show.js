App.Views.ResourceShow = Backbone.View.extend({

  initialize: function () {
    this.selecter = rangy.createCssClassApplier("currently-selected", {normalize: true});
    this.highlighter = rangy.createCssClassApplier("highlighted", {normalize: true});
    this.errorizer = rangy.createCssClassApplier("marked-as-error", {normalize: true});
    this.confusingizer = rangy.createCssClassApplier("marked-as-confusing", {normalize: true});

    $('#content').on('mouseup', this.controlPopover.bind(this));
    this.popoverShowing = false;
  },

  tagName: 'section',

  template: JST['resources/show'],

  events: {
  	"click #hide-table-of-contents": "hideTableOfContents"
  },

  displayHighlights: function () {
    var that = this;
    this.highlights = App.CurrentState.resource.highlights;
    _.each(this.highlights.models, function (highlight) {
      var className = that.highlightClassFromType(highlight.get("highlight_type"))
      _.each(highlight.get("marks"), function (mark) {
        $('.section').markText(mark.paragraph_text, {
          className: className
        });
      });

    });
  },

  highlightClassFromType: function ( type ) { // make mapping objects for this when get chance
    switch(type)
    {
    case "Highlight":
      return "highlighted";
    case "Error":
      return "marked-as-error";
    case "Confusing":
      return "marked-as-confusing";
    }
  },

  showHighlightOptions: function (e, $target) {
    var sectionId = $target.closest('section').data("section-id");

    var selection = rangy.getSelection();
    var selectionHtml = _.clone(selection.toHtml());
    var selectionText = _.clone(selection.toString());


    if (this.selectionIsValid(selection)) {

      this.selecter.applyToSelection(selection);
      this.popoverView = new App.Views.ResourcePopover({
        selectionHtml: selectionHtml,
        selectionText: selectionText,
        sectionId: sectionId,
        selection: selection
      });
      this.listenTo(this.popoverView, "actionTaken", this.removePopover.bind(this));

      $elToPopover = $('.currently-selected').last();
      $elToPopover.popover({
        html: true,
        trigger: "manual",
        placement: "auto top",
        content: this.popoverView.render().$el
      });
      $elToPopover.popover('show');

      this.selecter.undoToSelection(selection);
      this.popoverShowing = true;

    } else {
      // handle invalid selection, nothing for now
    }
  },

  selectionIsValid: function ( selection ) {
    var count = selection.toString().length; // there are many more validations to do!!!
    if (count < 4 || count > 2500) {
      return false;
    } else {
      return true;
    }
  },

  controlPopover: function ( e, opts ) { // build out the validations when you get the chance
    $target = $(e.target);
    if ($target.parents('.popover').length) {
      // within popover,  do nothing
    } else {
      // outside popover, check for close or show
      if (this.popoverShowing) {
        this.removePopover();
      } else if ($target.parents(".section").length && $target.prop("tagName") != "H3") {
        this.showHighlightOptions(e, $target);
      }
    }
  },

  removePopover: function () {
    this.popoverView.remove();
    $('.popover').remove();
    this.popoverShowing = false;
  },

  hideTableOfContents: function ( e ) {
    var that = this;
    $("#table-of-contents").slideUp("fast", function () {
      $(".resource").append('<span class="show" id="show-table-of-contents"></span>');
      $("#show-table-of-contents").click(that.showTableOfContents);
    });
  },

  showTableOfContents: function ( e ) {
    $("#show-table-of-contents").remove();
    $("#table-of-contents").slideDown("fast");
  },

  render: function () {
    var renderedContent = this.template({
      resource: this.model
    });
    this.$el.html(renderedContent).addClass('resource-wrapper'); // needed??
    return this;
  }

});