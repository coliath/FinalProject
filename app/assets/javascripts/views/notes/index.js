App.Views.NoteIndex = Backbone.View.extend({

  events: {
    'click #submit-note': 'submit',
  },

  submit: function ( e ) {
    e.preventDefault();

    var attrs = $(e.target).closest('form').serializeJSON(); // this is a good place for a view prototype getFormData Function
    attrs.note.resource_id = App.CurrentState.resource.get("id");

    var note = new App.Models.Note(attrs);

    var that = this;
    note.save(null, {
      success: function (resp) {
        that.collection.add(note);
      }
    });

    console.log(note);
  },

  initialize: function () {
    var renderCB = this.render.bind(this);

    this.listenTo(this.collection, "add", renderCB);
    this.listenTo(this.collection, "remove", renderCB);
  },

  template: JST['notes/index'],

  render: function () {
    var renderedContent = this.template({
      notes: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  }

});