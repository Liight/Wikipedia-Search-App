var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
//var api = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
var input = $("#search");
var cb = '&callback=?';
var pageLink = "http://en.wikipedia.org/?curid=";

// Start display setting
$("#search").hide();
$("#clear").hide();
$("#glass").hide();
$("#cover").click(function() {
  $("#search").show();
  $("#clear").show();
  $("#glass").show();
  $("#cover").hide();
  $("#search").focus();
});

// Clear search when button is pressed
$("#clear").click(function() {
  $("#search").val("").focus();
  $("#results-display").empty();
  $('body').css("overflow", "hidden");
});

// Make search input area small
function search_resize_small() {
  $("#search-box").animate({
    height: 40
  }, 600);
  $(":animated").promise().done(function() {
    $("#search-box").attr("id", "search-box-small");
  });
};

// Handle enter keypress
$(document).keypress(function(e) {
  if (e.which == 13) {
    $("#button").trigger("click");
  }
});

// Search button click or Enter press
$("#button").click(function() {
  // Empty the current search display
  $("#results-display").empty();
  // Allow the body to show overflow
  $('body').css("overflow", "scroll");
  // Query the wiki API
  var title = input.val();
  $.getJSON(api + title + cb, function(data) {
    console.log(data.query.pages);
    // Declare Usefull Variables
    var results = data.query.pages;
    // Resize "search-box"
    search_resize_small();
    // Display results
    $.each(results, function() {
      var link = pageLink + this.pageid;
      $("#results-display").append($("<a target=\"_blank\" href=\"" + link + " \"><div id=\"result\"><div class=\"title\"><b>" + this.title + "\"</b></div><div class=\"description\">" + this.extract + "\"</div></div></a>"));
    });
  });
});