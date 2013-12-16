App.Routers.Resources = Backbone.Router.extend({

  routes: {
    "": "index",
    "resources/:id": "showReaderView",
  },

  initialize: function () {
    this.$resourceEl = $('#resource-content');
    this.$socialEl = $("#social-content");
  },

  initResource: function ( id ) {
    var that = this;
    App.CurrentState.resource = new App.Models.Resource({ id: id });
    App.CurrentState.resource.fetch({
      success: function (resp) {
        that.showResource();
        that.initNotes();
      }
    });
  },

  showResource: function () {
    var showView = new App.Views.ResourceShow({ model: App.CurrentState.resource });
    this._swapView(this.$resourceEl, showView);
  },

  initNotes: function () {
    var that = this;
    App.CurrentState.user.notes = new App.Collections.Notes([], {resource_id: App.CurrentState.resource.get("id")});
    App.CurrentState.user.notes.fetch({
      success: function (collection, resp, opt) {
        that.showNotes();
        that.initQuestions();
      }
    });
  },

  showNotes: function () {
    var notesIndex = new App.Views.NoteIndex({collection: App.CurrentState.user.notes});
    this._swapView(this.$socialEl, notesIndex);
  },

  initQuestions: function () {
    var that = this;
    App.CurrentState.resource.questions = new App.Collections.Questions([],{ resource_id: App.CurrentState.resource.get("id") });
    App.CurrentState.resource.questions.fetch({
      success: function (collection, resp, opt) {
        that.addQuestions();
        that.initDiscussions();
      }
    });
  },

  addQuestions: function () {
    var questionIndex = new App.Views.QuestionIndex({collection: App.CurrentState.resource.questions});
    this.$socialEl.append(questionIndex.render(true).$el);
  },

  initDiscussions: function () {
    var that = this;
    App.CurrentState.resource.discussions = new App.Collections.Discussions([],{ resource_id: App.CurrentState.resource.get("id") });
    App.CurrentState.resource.discussions.fetch({
      success: function (collection, resp, opt) {
        that.addDiscussions();
        that.addSocialNav();
      }
    });
  },

  addDiscussions: function () {
    var discussionIndex = new App.Views.DiscussionIndex({collection: App.CurrentState.resource.discussions});
    this.$socialEl.append(discussionIndex.render(true).$el);
  },

  addSocialNav: function () {
    var socialNav = new App.Views.SocialNav();
    this.$socialEl.prepend(socialNav.render().$el);
  },

  showReaderView: function ( id ) {
    this.initResource(id);
  },

  index: function () {
    // ONLY FOR NOW!!
    this.initResource(1);
  },

  _swapView: function ( el, view ) {
    el.html(view.render().$el);
  },





});