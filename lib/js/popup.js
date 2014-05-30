var site="http://sharedbookmarks.herokuapp.com";

document.addEventListener('DOMContentLoaded', function () {
  // kittenGenerator.requestKittens();
});
      function log_in() {
        var user_name=$('#user-name').val();
        var password=$('#password').val();
        var call_url=site+"/api/log_in?email="+user_name+"&password="+password;
        console.log("Calling: "+call_url);
        // Call AJAX access_token
        $.ajax({
            url: call_url,
            type: 'GET',
            success: function(data) {
                var access_token=data.access_token;
                console.log("Gonna try to save: "+access_token);
                chrome.storage.sync.set({'access_token': access_token}, function() {
                    chrome.storage.sync.get("access_token", function(data) {
                      console.log("access_token", data);
                    });
                  });
            },
            error: function(){
              console.log((arguments));              
            }
        });
        // Save it using the Chrome extension storage API.
          // Notify that we saved.
      }
      function load_bookmarks(access_token){
        var call_url=site+"/api/bookmarks";
        $.ajax({
            url: call_url,
            type: 'GET',
            data: { access_token: access_token} ,
            success: function(data) {
              console.log(JSON.stringify(data));
              parse_json(data);
              // $('#json-viewer').text(JSON.stringify(data));

            } 
          });      
      }
$(document).ready(function(){
    chrome.storage.sync.get("access_token", function (data) {
          if(data.access_token!=undefined){
            load_bookmarks(data.access_token);
            console.log(data.access_token);
          }
          else{
            $('#log-in').removeClass('hide');
          }
    });
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
  $('#accept').click(function(){
    log_in();    
  });
  $('#add-group').click(function(){
    create_group(true);
  });  
});
function parse_json(json){
  var group_counter=0;
  var folder_counter=0;
  json.groups.forEach(function(g){
    $('#main-ul').append($('<li>').attr('value',group_counter).attr('class',' group-li full-width').append(g.name));
    $('#folders-div').append($('<ul>').attr('class','folder-ul hide').attr('id','folder-ul'+group_counter));
    g.folders.forEach(function(f){
      $('#folder-ul'+group_counter).append($('<li>').attr('value',folder_counter).attr('class','folder-li full-width').append(f.name));      
      $('#bookmarks-div').append($('<ul>').attr('id','bookmark-ul'+folder_counter).attr('class','bookmark-ul hide'));
      f.bookmarks.forEach(function(b){
        $('#bookmark-ul'+folder_counter).append($('<li>').attr('class','bookmark-li').append($('<a>').attr('class','full-width').attr('href',b.link).append(b.name)));
        console.log(b.name);
      });
    folder_counter+=1;
    console.log(folder_counter);
    });
    group_counter+=1;
  });
  update_clicks();
}
function update_clicks(){
    $('.group-li').click(function(a){
    $('#json-viewer').css('width','405px');
    $('#folders-div').removeClass('hide');
    $('.folder-ul').addClass('hide');
    $('#folder-ul'+$(this).attr('value')).removeClass('hide');
    $('#bookmarks-div').addClass('hide');
    $('.bookmark-ul').addClass('hide');
    $('.divider').css('height',$('#json-viewer').height());
   });
    $('.folder-li').click(function(){
    $('#json-viewer').css('width','605px');
    $('#bookmarks-div').removeClass('hide');
    $('.bookmark-ul').addClass('hide');
    $('#bookmark-ul'+$(this).attr('value')).removeClass('hide');
    $('.divider').css('height',$('#json-viewer').height());
    });
}
function create_group(variable){
  if(variable==true){
    chrome.tabs.executeScript(null, { file: "lib/js/jquery-1.11.0.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "lib/js/modal.js" });
    });
  }
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.cmd == "read_file") {
        $.ajax({
            url: chrome.extension.getURL("new-group.html"),
            dataType: "html",
            success: sendResponse
        });
    }
})
      


