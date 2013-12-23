


App.Modules.parseCommentable = function ( json, commentableType ) {

	json.comment_count = json.comments.length;
	json.comments = new App.Collections.Comments(json.comments, {
		commentable_id: json.id,
		commentable_type: commentableType,
		parse: true
	});

	App.CurrentData.comments.add(json.comments.models);

	return json;
}

App.Modules.renderComments = function ( $wrapper, comments ) {
	var commentsIndex = new App.Views.CommentIndex({ collection: comments });
	$wrapper.append(commentsIndex.render().$el);
}

App.Modules.makeCommentable = function ( viewObj ) {

	var commentableFunctions = {

		renderComments: function ($wrapper) {
			this.commentsIndex = new App.Views.CommentIndex({ collection: this.model.get("comments") });
			$wrapper.append(this.commentsIndex.render({ hidden: true }).$el);
		},

		showCommentForm: function ( e ) {
			e.stopPropagation();
			this.commentsIndex.render();
			this.commentsIndex.focus();
		}
	}

	var commentableEvents = {
		"click .add-comment": "showCommentForm"
	}

	_.extend(viewObj, commentableFunctions);

	if ( typeof viewObj.events === "undefined" ) {
            viewObj.events = {};
    }

    for (var key in commentableEvents) {
        if (commentableEvents.hasOwnProperty(key)) {
               viewObj.events[key] = commentableEvents[key];
        }
    }
}











