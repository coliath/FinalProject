window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  CurrentData: {},
  CurrentState: {
    user: {}
  }, // i am not how sure if this is the best way to handle this
  Modules: {}, // better name for this?
  initialize: function() {

    App.CurrentData.users = new App.Collections.Users();
    App.CurrentData.resources = new App.Collections.Resources();
    App.CurrentData.sections = new App.Collections.Sections();
    App.CurrentData.notes = new App.Collections.Notes();
    App.CurrentData.questions = new App.Collections.Questions();
    App.CurrentData.answers = new App.Collections.Answers();
    App.CurrentData.discussions = new App.Collections.Discussions();
    App.CurrentData.responses = new App.Collections.Responses();
    App.CurrentData.highlights = new App.Collections.Highlights();
    App.CurrentData.comments = new App.Collections.Comments();
    App.CurrentData.votes = new App.Collections.Votes();

    new App.Routers.Resources();
    Backbone.history.start();
  }
};
