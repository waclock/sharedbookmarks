if($('#sbm-modal').length>0){
  $('#sbm-modal').remove();
}
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
// $("#sbm-modal").load(chrome.extension.getURL("new-group.html"));  
chrome.extension.sendRequest({cmd: "read_file"}, function(html){
    modal=$('#sbm-modal').contents().find('body');
    modal_head=$('#sbm-modal').contents().find('head');
    modal_head.append('<link href='+chrome.extension.getURL("lib/css/custom.css")+' rel="stylesheet" media="screen">');
    modal.append(modalBackground);
    modal.append(modal_body);
    modal.find("#modal-body").append(html);

       
});  
