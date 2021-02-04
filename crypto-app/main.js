const electron = require("electron");
const { app, BrowserWindow, Menu } = require("electron");
const shell = require("electron").shell;
const ipc = require('electron').ipcMain
const remote = electron.remote;
let win


function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		webPreferences: { nodeIntegration: true },
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
    });
    win.on("close", function () {
		app.quit();
	});

	// and load the index.html of the app.
	win.loadFile("src/index.html");

	// Open the DevTools.
	//win.webContents.openDevTools();

	var menu = Menu.buildFromTemplate([
		{
			label: "Menu",
			submenu: [
				{ label: "Adjust Notification value" },
				{ type: "separator" },
				{
					label: "CoinMarketCap",
					click() {
						shell.openExternal("http://coinmarketcap.com");
					},
				},
				{ type: "separator" },
				{
					label: "Exit",
					click() {
						app.quit();
					},
				},
			],
		},
	]);

	Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
        app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

ipc.on('update-notify-value', function(event, arg){
    win.webContents.send('targetPriceVal',arg)
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
