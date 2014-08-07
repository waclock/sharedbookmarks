// var site="http://sharedbookmarks.herokuapp.com";
var site="http://localhost:3000";
//Agregamos evento para poder llamar desde un content-script
document.addEventListener('send_new_group', function(e) {
  // e.detail contains the transferred data (can be anything, ranging
  // from JavaScript objects to strings).
  // Do something, for example:
  new_group_api(e.detail);
});  
document.addEventListener('send_new_folder', function(e) {
  new_folder_api(e.detail.name,e.detail.group_id);
});  
document.addEventListener('send_new_bookmark', function(e) {
  new_bookmark_api(e.detail.name,e.detail.link,e.detail.folder_id);
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
  load_data();
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
  $('#add-folder').click(function(){
    create_folder(true,$('#new-folder-button').attr('value'));
  });  
  $('#add-bookmark').click(function(){
    create_bookmark(true,$('#new-bookmark-button').attr('value'));
  });      
});
function parse_json(json){
  var group_counter=0;
  var folder_counter=0;
  json.groups.forEach(function(g){
    $('#main-ul').append($('<li>').attr('value',group_counter).attr('class',' group-li full-width').attr('data-value',g.id).append(g.name));
    $('#folders-div').append($('<ul>').attr('class','folder-ul hide').attr('id','folder-ul'+group_counter));
    g.folders.forEach(function(f){
      $('#folder-ul'+group_counter).append($('<li>').attr('value',folder_counter).attr('class','folder-li full-width').attr('data-value',f.id).append(f.name));      
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
      $('#new-folder-button').attr('value',$(this).attr('data-value'));
      $('#json-viewer').css('width','405px');
      $('#folders-div').removeClass('hide');
      $('.folder-ul').addClass('hide');
      $('#folder-ul'+$(this).attr('value')).removeClass('hide');
      $('#bookmarks-div').addClass('hide');
      $('.bookmark-ul').addClass('hide');
      $('.divider').css('height',$('#json-viewer').height());
   });
    $('.folder-li').click(function(){
      $('#new-bookmark-button').attr('value',$(this).attr('data-value'));      
      $('#json-viewer').css('width','600px');
      $('#bookmarks-div').removeClass('hide');
      $('.bookmark-ul').addClass('hide');
      $('#bookmark-ul'+$(this).attr('value')).removeClass('hide');
      $('.divider').css('height',$('#json-viewer').height());
    });
}
function create_group(variable){
  if(variable==true){
    chrome.tabs.executeScript(null, { file: "lib/js/jquery-1.11.0.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "lib/js/group_modal.js" });
    });
  }
}
function create_folder(variable,group_val){
  if(variable==true){
    chrome.tabs.executeScript(null, { file: "lib/js/jquery-1.11.0.min.js" }, function() {
      chrome.tabs.executeScript(null, {code: "var scriptOptions = {group_value: "+group_val+"};"}, function(){
        chrome.tabs.executeScript(null, { file: "lib/js/folder_modal.js"});
      });
    });
  }
}
function create_bookmark(variable,folder_val){
  if(variable==true){
    chrome.tabs.executeScript(null, { file: "lib/js/jquery-1.11.0.min.js" }, function() {
      chrome.tabs.executeScript(null, {code: "var scriptOptions = {folder_value: "+folder_val+"};"}, function(){
        chrome.tabs.executeScript(null, { file: "lib/js/bookmark_modal.js"});
      });
    });
  }
}

function bookmark_folder(variable){
  if(variable==true){
    chrome.tabs.executeScript(null, { file: "lib/js/jquery-1.11.0.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "lib/js/bookmark_modal.js" });
    });
  }
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.cmd == "new_group") {
        $.ajax({
            url: chrome.extension.getURL("new-group.html"),
            dataType: "html",
            success: sendResponse
        });
    }
    else if(request.cmd == "new_folder") {
        $.ajax({
            url: chrome.extension.getURL("new-folder.html"),
            dataType: "html",
            success: sendResponse
        });
    }  
    if(request.cmd == "new_bookmark") {
        $.ajax({
            url: chrome.extension.getURL("new-bookmark.html"),
            dataType: "html",
            success: sendResponse
        });
    }  
})
  $(document).keyup(function(e) {

    if (e.keyCode == 27 && $('#sbm-modal').length>0) {
      $('#sbm-modal').remove();
    }
  });
function load_data(){
    chrome.storage.sync.get("access_token", function (data) {
        if(data.access_token!=undefined){
          load_bookmarks(data.access_token);
          console.log(data.access_token);
          $('#add-group').removeClass('hide');
        }
        else{
          $('#log-in').removeClass('hide');
        }
  });
}
function callIframe(url, callback) {
    $('iframe#myId').attr('src', url);

    $('iframe#sbm-modal').load(function() {
        callback(this);
    });
}

// API Methods
  // New Group
  function new_group_api(name){
    var call_url=site+"/api/new_group";
    console.log("new_group");
    chrome.storage.sync.get("access_token", function(data) {
      $.ajax({
        url: call_url,
        type: 'POST',
        data: { access_token: data.access_token,name:name} ,
        success: function(data) {
          console.log(JSON.stringify(data));
        } 
      }); 
    });
  }
  // New Folder
  function new_folder_api(name,group_id){
    var call_url=site+"/api/new_folder";
    console.log("new_folder");
    chrome.storage.sync.get("access_token", function(data) {
      $.ajax({
        url: call_url,
        type: 'POST',
        data: { access_token: data.access_token,name:name,group_id: group_id} ,
        success: function(data) {
          console.log(JSON.stringify(data));
        } 
      }); 
    });
  }
  // New Bookmark
  function new_bookmark_api(name,link,folder_id){
    var call_url=site+"/api/new_bookmark";
    console.log("new_bookmark");
    chrome.storage.sync.get("access_token", function(data) {
      $.ajax({
        url: call_url,
        type: 'POST',
        data: { access_token: data.access_token,name:name,folder_id: folder_id,link: link} ,
        success: function(data) {
          console.log(JSON.stringify(data));
        } 
      }); 
    });
  }  


