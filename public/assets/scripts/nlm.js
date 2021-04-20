$( document ).ready(function() {
setTimeout(function() {
//
// Wait a half a second for /nlmFooter.html to load before changing the Customer Service link
//
 $( ".supportLink" ).attr("href", "//support.nlm.nih.gov?from=" + window.location.href);
 }, 500);

// $( ".insertheader" ).load("/nlmHeader.frag"); 
$.get('/nlmHeader.frag', function(data){ // Loads content into the 'data' variable.
   $('.insertheader').html(data); // Injects 'data' after the .insertheader element.
  });

// $( ".insertfooter" ).load("/nlmFooter.frag"); 

   $.get('/nlmFooter.frag', function(data){ // Loads content into the 'data' variable.
   $('.insertfooter').html(data); // Injects 'data' after the .insertfooter element.
  });
  
  var pathname = window.location.pathname;
if (!readCookie("coop"))
{  
if (/\/about\/visitor.html$/.test(pathname))
{
 $.get('/coop-visitor.frag', function(data){ // Loads content into the 'data' variable.
    $('.insertheader').after(data); // Injects 'data' after the .insertheader element.
  });
}
  else
{
 $.get('/coop.frag', function(data){ // Loads content into the 'data' variable.
    $('.insertheader').after(data); // Injects 'data' after the .insertheader element.
  });
} 
 }
 else
 {
  $(".container-fluid .bgdanger").hide(); 
 }
});

var createCookie = function(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = '; expires=' + date.toGMTString();
    }
    else var expires = '';
        document.cookie = name + '=' + value + expires + '; path=/';
};
var readCookie = function(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};
var eraseCookie = function(name) {
    createCookie(name, '', -1);
};

function coopcookie() {
//  $(".container-fluid .bgdanger").hide();
  createCookie("coop", "hidden");
};
