document.addEventListener("DOMContentLoaded", function() {

	var url = window.location.href;

	if (url.indexOf("/resources/") !== -1 || url.indexOf("/top_containers/") !== -1 || url.indexOf("/archival_objects/") !== -1) {
		document.getElementById("spec_request").style.display = "block";
	}

});
