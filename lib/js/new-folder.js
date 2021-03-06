var iframe = document.getElementById('sbm-modal'),
    iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

$(iframeDoc).ready(function (event) {
    input_name=$(iframeDoc).find('#sbm-new-folder-name')
    setTimeout(function() {
      input_name.focus();
    }, 500);
    // now you can access any element in the iframe (if same domain)
    $(iframeDoc).find('#sbm-new-folder').on('click', function (event) {
      if(input_name.length>0)
        create_folder(input_name.val(),$(this).attr('value'));
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
    $('#sbm-new-folder').click(function(){
      console.log("Holi");
      if($('#sbm-new-folder-name').length>0)
        create_folder($('#sbm-new-folder-name').val(),$(this).attr('value'));
    });
  });
  function create_folder(name,group_id){
    console.log("creando carpeta");
    var data={};
    data["name"]=name;
    data["group_id"]=group_id;
    console.log(data);
    // updated: this works with Chrome 30:
    var evt=document.createEvent("CustomEvent");
    evt.initCustomEvent("send_new_folder", true, true, data);
    document.dispatchEvent(evt);
    $('#sbm-modal').remove();
  }