var iframe = document.getElementById('sbm-modal'),
    iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

$(iframeDoc).ready(function (event) {
    input_name=$(iframeDoc).find('#sbm-new-bookmark-name')
    setTimeout(function() {
      input_name.focus();
    }, 500);
    // now you can access any element in the iframe (if same domain)
    $(iframeDoc).find('#sbm-new-bookmark').on('click', function (event) {
      if(input_name.length>0)
        create_bookmark(input_name.val(),$(iframeDoc).find('#sbm-new-bookmark-link').val(),$(this).attr('value'));
    });
    $(iframeDoc).keyup(function(e){
      if (e.keyCode == 27) {
        $('#sbm-modal').remove();
      }
    });
});

	$(document).keyup(function(e) {

	});
  $('#sbm-modal').ready(function(){
    $('#sbm-new-bookmark').click(function(){
      console.log("Holi");
      if($('#sbm-new-bookmark-name').length>0)
        create_bookmark($('#sbm-new-bookmark-name').val(),$('#sbm-new-bookmark-link').val(),$(this).attr('value'));
    });
  });
  function create_bookmark(name,link,folder_id){
    console.log("creando bookmark");
    var data={};
    data["name"]=name;
    data["link"]=link;
    data["folder_id"]=folder_id;
    console.log(data);
    // updated: this works with Chrome 30:
    var evt=document.createEvent("CustomEvent");
    evt.initCustomEvent("send_new_bookmark", true, true, data);
    document.dispatchEvent(evt);
    $('#sbm-modal').remove();
  }