const electron = require('electron')
const path = require('path')
const remote = require("electron").remote;
const ipc = electron.ipcRenderer

document.getElementById("closeBtn").addEventListener("click", function (e) {
	var window = remote.getCurrentWindow();
	window.close();
}); 

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function(){
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)
    
    var window = remote.getCurrentWindow();
    window.close()
})