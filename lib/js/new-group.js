var iframe = document.getElementById('sbm-modal'),
    iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

$(iframeDoc).ready(function (event) {
    input_name=$(iframeDoc).find('#sbm-new-group-name')
    setTimeout(function() {
      input_name.focus();
    }, 500);
    // now you can access any element in the iframe (if same domain)
    $(iframeDoc).find('#sbm-new-group').on('click', function (event) {
      if(input_name.length>0)
        create_group(input_name.val());
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
    $('#sbm-new-group').click(function(){
      console.log("Holi");
      if($('#sbm-new-group-name').length>0)
        create_group($('#sbm-new-group-name').val());
    });
  });
  function create_group(name){
    console.log("creando grupo");

    var data=name;
    // updated: this works with Chrome 30:
    var evt=document.createEvent("CustomEvent");
    evt.initCustomEvent("send_new_group", true, true, data);
    document.dispatchEvent(evt);
    $('#sbm-modal').remove();
  }