const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
        label: 'Save image not working',
        // Only show it when right-clicking images 
        visible: params.mediaType === 'image'
    }]
});

// init win
let win;

function createWindow() {
  // Create browser window
  win = new BrowserWindow({width:800, height:600, icon:__dirname+'/img/youtubepcappicon.png'})

  // Load index.html
  win.loadURL('http://brsocial.esy.es/ytpc');

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