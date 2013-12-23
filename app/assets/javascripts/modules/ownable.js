


App.Modules.parseOwnable = function ( json ) {
	
	json.user = new App.Models.User(json.user);
	json.username = json.user.get("username");
	App.CurrentData.users.add(json.user);

	return json;
}