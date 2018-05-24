

loadLib('http://sdk.iqiyi.com:6001/public/lib.js',function(){
  console.log(window.sdk);
});

//加载JS（从localstorage或服务器）
function loadLib(url,callback){
  var content = getLocalStorage(url);
  if(content){
    injectContentToScript(content,callback);
  }else{
    sendAjax(url,callback);
  }
}

//将文本注入到script标签中
function injectContentToScript(content,callback){
    var script = document.createElement('script');
    script.innerHTML = content;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
    script = null;
    if(callback){
      callback();
    }
}
//从服务器获取JS文件内容
function sendAjax(url,callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(event){
        if (xhr.readyState == 4){
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                content = xhr.responseText;
                setLocalStorage(url,content);
                injectContentToScript(content,callback);
            }
        }
    };
    xhr.open("get", url, true);
    xhr.send();
}

function setLocalStorage(item,val){
  localStorage.setItem(item,val);
}

function getLocalStorage(item){
   var storageVal = localStorage.getItem(item);
   return storageVal;
}