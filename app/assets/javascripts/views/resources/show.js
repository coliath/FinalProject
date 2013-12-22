App.Views.ResourceShow = Backbone.View.extend({

  initialize: function () {
    this.selecter = rangy.createCssClassApplier("currently-selected", {normalize: true});
    this.highlighter = rangy.createCssClassApplier("highlighted", {normalize: true});
    this.errorizer = rangy.createCssClassApplier("marked-as-error", {normalize: true});
    this.confusingizer = rangy.createCssClassApplier("marked-as-confusing", {normalize: true});

    $('#content').on('mouseup', this.controlPopover.bind(this));
    
    $('#content').on('click', this.resize.bind(this));
    $(window).resize(this.resize.bind(this));
    this.popoverShowing = false;
  },

  tagName: 'section',

  template: JST['resources/show'],

  events: {
  	"click #hide-table-of-contents": "hideTableOfContents",
  },

  resize: function ( e ) { // totally re write all this, better, somewhere else
      // write a new class that controlls all showing/hiding/resizing
      // but dont until MVP is completed
    $content = $('#content');
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var navHeight = $('.top-nav').height();
    var resourceWidth = $('.resource').width() + 7;

    if ($('#show-table-of-contents').length && $('#show-social').length) {
      $content.width(resourceWidth);
    } else if ($('#show-table-of-contents').length) {
      $content.width(resourceWidth + $('#social-content').width() + 30);
    } else if ($('#show-social').length) {
      $content.width(resourceWidth + $('#table-of-contents').width() + 18);
    } else {
      $content.width(1350);
    }

    $('.resource').height(windowHeight - navHeight - 17);
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
    console.log("WHAT");
    $("#table-of-contents").slideUp("fast", function () {
      $(".resource").append('<span class="show" id="show-table-of-contents"></span>');
      $("#show-table-of-contents").click(that.showTableOfContents.bind(that));
      that.resize();
    });
  },

  showTableOfContents: function ( e ) {
    var that = this;
    $("#show-table-of-contents").remove();
    $("#table-of-contents").slideDown("fast", function () {
      that.resize();
    });
  },

  render: function () {
    var renderedContent = this.template({
      resource: this.model
    });
    this.$el.html(renderedContent).addClass('resource-wrapper'); // needed??
    return this;
  }

});