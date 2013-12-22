App.Modules.makeVoteable = function ( viewObj ) {

	var voteFunctions = {

		renderVotes: function ( $wrapper ) {
		    var votes = new App.Collections.Votes([], {voteable_id: this.model.get("id"), voteable_type: this.type });
		    votes.fetch({
		        success: function (collection, resp, opts) {
		        	var voteView = new App.Views.Vote({ collection: votes });
		        	$wrapper.append(voteView.render().$el);
		        }
		    });
		},

	}

	_.extend(viewObj, voteFunctions);

}