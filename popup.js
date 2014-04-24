// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
// var QUERY = 'kittens';

// var kittenGenerator = {
//   /**
//    * Flickr URL that will give us lots and lots of whatever we're looking for.
//    *
//    * See http://www.flickr.com/services/api/flickr.photos.search.html for
//    * details about the construction of this URL.
//    *
//    * @type {string}
//    * @private
//    */
//   searchOnFlickr_: 'https://secure.flickr.com/services/rest/?' +
//       'method=flickr.photos.search&' +
//       'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
//       'text=' + encodeURIComponent(QUERY) + '&' +
//       'safe_search=1&' +
//       'content_type=1&' +
//       'sort=interestingness-desc&' +
//       'per_page=20',

//   /**
//    * Sends an XHR GET request to grab photos of lots and lots of kittens. The
//    * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
//    *
//    * @public
//    */
//   requestKittens: function() {
//     var req = new XMLHttpRequest();
//     req.open("GET", this.searchOnFlickr_, true);
//     req.onload = this.showPhotos_.bind(this);
//     req.send(null);
//   },

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
//   showPhotos_: function (e) {
//     var kittens = e.target.responseXML.querySelectorAll('photo');
//     for (var i = 0; i < kittens.length; i++) {
//       var img = document.createElement('img');
//       img.src = this.constructKittenURL_(kittens[i]);
//       img.setAttribute('alt', kittens[i].getAttribute('title'));
//       document.body.appendChild(img);
//     }
//   },

//   *
//    * Given a photo, construct a URL using the method outlined at
//    * http://www.flickr.com/services/api/misc.urlKittenl
//    *
//    * @param {DOMElement} A kitten.
//    * @return {string} The kitten's URL.
//    * @private
   
//   constructKittenURL_: function (photo) {
//     return "http://farm" + photo.getAttribute("farm") +
//         ".static.flickr.com/" + photo.getAttribute("server") +
//         "/" + photo.getAttribute("id") +
//         "_" + photo.getAttribute("secret") +
//         "_s.jpg";
//   }
// };

// Run our kitten generation script as soon as the document's DOM is ready.



document.addEventListener('DOMContentLoaded', function () {
  // kittenGenerator.requestKittens();
});
      function log_in() {
        var user_name=$('#user-name').val();
        var password=$('#password').val();
        var call_url="http://sharedbookmarks.herokuapp.com/api/log_in?email="+user_name+"&password="+password;
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
              console.log($.makeArray(arguments));              
            }
        });
        // Save it using the Chrome extension storage API.
          // Notify that we saved.
      }
$(document).ready(function(){
  $('#see_token').click(function(e){
    chrome.storage.sync.get("access_token", function (data) {
            console.log('access_token',data.access_token);
            $('#user-name').val(data.access_token);
        });
  }); 
  $('#accept').click(function(e){
    log_in();    
  })
});


      


