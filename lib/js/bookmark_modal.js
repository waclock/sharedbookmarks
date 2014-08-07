if($('#sbm-modal').length>0){
  $('#sbm-modal').remove();
}
// console.log(scriptOptions.group_value);
wrapperIframe = document.createElement("iframe");
wrapperIframe.setAttribute("style","position: fixed; left: 0px; top: 0px; z-index: 2000; height: 1083px; width: 100%;");
wrapperIframe.setAttribute("id","sbm-modal");
wrapperIframe.setAttribute("allowtransparency",true);
modalBackground=document.createElement("div");
modalBackground.setAttribute("style","position: fixed; left: 0px; top: 0px; z-index: -1; height: 1083px; width: 100%;opacity:0.5;background-color:white;");
$('body').append(wrapperIframe);
modal_body=document.createElement("div");
modal_body.setAttribute("id","modal-body");
modal=$('#sbm-modal').contents().find('body').append(modal_body);
// $("#sbm-modal").load(chrome.extension.getURL("new-bookmark.html"));  
chrome.extension.sendRequest({cmd: "new_bookmark"}, function(html){
    modal=$('#sbm-modal').contents().find('body');
    modal_head=$('#sbm-modal').contents().find('head');
    modal_head.append('<link href='+chrome.extension.getURL("lib/css/custom.css")+' rel="stylesheet" media="screen">');
    modal_head.append('<<script src='+chrome.extension.getURL("lib/js/jquery-1.11.0.min.js")+'></script>');
    modal_head.append('<<script src='+chrome.extension.getURL("lib/js/new-bookmark.js")+'></script>');
    modal.append(modalBackground);
    modal.append(modal_body);
    modal.find("#modal-body").append(html);
    modal_button=modal.find('#sbm-new-bookmark');    
    modal_button.attr('value',scriptOptions.folder_value);

});  
