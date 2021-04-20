//
// JavaScript loader
// based on http://friendlybit.com/js/lazy-loading-asyncronous-javascript/
// and http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
//
function loadScript(url, callback) {

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;

    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" ||
                script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others
        script.onload = function() {
            callback();
        };
    }

    script.src = url;
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(script, x);

    return script;

} // loadScript


function loadStyle(url, media) {
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = url;
    css.type = "text/css";
    if (media) {
        css.media = media;
    }
    document.getElementsByTagName("head")[0].appendChild(css);

    return css;

} // loadStyle

//
// Load search autocomplete
//
loadScript("//assets.nlm.nih.gov/jquery-ui/jquery-ui-latest/jquery-ui.min.js", function() {
    loadScript("//www.nlm.nih.gov/core/nlm-autocomplete/1.1/nlm-autocomplete.min.js", function() {
        $(document).ready(function() {
          setTimeout(function() {
            nlm.autocomplete.add({element: "#search", dictionary: "nlm-ac-dictionary", width: 0});
            nlm.autocomplete.add({element: "#search2", dictionary: "nlm-ac-dictionary", width: 0});
          }, 2000);
        });
    });
});

loadStyle("//www.nlm.nih.gov/scripts/jqueryui11/jquery-ui.min.css");
loadStyle("//www.nlm.nih.gov/core/nlm-autocomplete/1.1/nlm-autocomplete.css");

loadScript("//www.nlm.nih.gov/core/nlm-notifyExternal/1.0/nlm-notifyExternal.min.js", function() {
    $(document).ready(function() {
      nlm.notifyExternal.setNotification();
    });
});
