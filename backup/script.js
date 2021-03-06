(function (global) {

var dc = {};

var statshtml = "stats.html";
var statsid = "stats_content";
var pyscript = "cgi-bin/scrape.py?";
// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};


var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
        string = string
          .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
      };
// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='Images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// On page load (before images or CSS)
$('button').bind("click",function(event) {
// On first load, show home view
var User = $('#inputbox input').val();
showLoading("#content");
$ajaxUtils.runPyScript(
  pyscript+'param1='+User,
  function(responseText) {
     $ajaxUtils.sendGetRequest(
        statshtml,
        function (responseText) {
          console.log('Hello');
          responseText =  insertProperty(responseText, "User", User);
          document.querySelector('#content')
              .id = 'stats_content'
              document.querySelector('#stats_content')
                .innerHTML = responseText;
        },
        false)},
     false)})

global.$dc = dc;

})(window);
