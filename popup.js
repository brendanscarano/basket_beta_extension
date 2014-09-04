window.onload = function() {
  chrome.tabs.getSelected(null, function(tab) {
      tabUrl = tab.url;
  });

  request_handler('http://localhost:3000/users_folders', '.basket-list')
  request_handler('http://localhost:3000/users_friends', '.friend-list')

  $('.basket-list').on('click', '.basket-click', function(){
    var folderId = $(this).attr('value');
    sendData('new_link', folderId, tabUrl)
  })

  $('.friend-list-wrapper').on('click', '.friend-container', function(){
    sendData('sent_link', tabUrl)
  })
}

function request_handler(url, changed_div) {
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function(){
      // successful response
      if (req.readyState==4 && req.status==200) {
          // console.log(req.responseText);
          document.querySelector(changed_div).innerHTML = (req.responseText);
      }
  }
  req.send();
}

function sendData(path, id, url){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {ping: "Send Page Info"}, function(response) {
      pageInfo = response.page_info;

      var req = new XMLHttpRequest(); 

      req.open("POST", 'http://localhost:3000/' + path);
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      req.send(JSON.stringify({url: url,
                              uniqueId: id,
                              pageInfo: pageInfo}));
    });  
  });
};
