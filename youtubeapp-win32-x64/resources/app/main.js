const {app, BrowserWindow} = require('electron');
const url = require('url');
require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
        label: 'Rainbow',
        // Only show it when right-clicking images 
        visible: params.mediaType === 'image'
    }]
});

// init win
let win;

function createWindow() {
	// Create browser window
	win = new BrowserWindow({width:800, height:600})

	// Load index.html
	win.loadURL('https://youtube.com');

	win.webContents.on('new-window', function(e, url) {
  	e.preventDefault();
  	require('electron').shell.openExternal(url);
	});

	win.on('closed', () => {
		win = null;
	});
}

// Run create window function
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
	if(process.platform !== 'win32'){
		app.quit();
	}
});