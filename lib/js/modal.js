wrapperDiv = document.createElement("iframe");
wrapperDiv.setAttribute("style","position: fixed; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;");
wrapperDiv.setAttribute("id","sbm-modal");
$('body').append(wrapperDiv);
  modal_body=document.createElement("div");
  modal_body.setAttribute("id","modal-body");
  modal=$('#sbm-modal').contents().find('body').append(modal_body);  
// $("#sbm-modal").load(chrome.extension.getURL("new-group.html"));  
// chrome.extension.sendRequest({cmd: "read_file"}, function(html){
//     console.log(html);
//     modal=$('#sbm-modal').contents().find('body').append(modal_body);
//     $("#modal-body").append(html);
// });  
// iframeElement = document.createElement("iframe");
// iframeElement.setAttribute("style","width: 100%; height: 100%;");
// wrapperDiv.appendChild(iframeElement);

// modalDialogParentDiv = document.createElement("div");
// modalDialogParentDiv.setAttribute("style","position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");

// modalDialogSiblingDiv = document.createElement("div");

// modalDialogTextDiv = document.createElement("div"); 
// modalDialogTextDiv.setAttribute("style" , "text-align:center");

// modalDialogTextSpan = document.createElement("span"); 
// modalDialogText = document.createElement("strong"); 
// modalDialogText.innerHTML = "Processing...  Please Wait.";

// breakElement = document.createElement("br"); 
// modalDialogTextSpan.appendChild(modalDialogText);
// modalDialogTextDiv.appendChild(modalDialogTextSpan);
// modalDialogTextDiv.appendChild(breakElement);
// modalDialogTextDiv.appendChild(breakElement);

// modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
// modalDialogParentDiv.appendChild(modalDialogSiblingDiv);
