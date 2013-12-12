App.Models.Resource = Backbone.Model.extend({
  urlRoot: "/resources",

  parse: function ( json ) {
    this.sections = new App.Collections.Sections(json.sections);

    delete json.sections;

    return json;
  }
});