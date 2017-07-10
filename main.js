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

require('electron-dl')();

// init win
let win;

function createWindow() {
  // Create browser window
  win = new BrowserWindow({width:800, height:600, icon:__dirname+'/img/youtubepcappicon.png',webPreferences: {'node-integration': false}})

  // Load index.html
  win.loadURL('file://' + __dirname + '/index.html');

  win.maximize();

  win.on('closed', () => {
    win = null;
  });

  win.webContents.on('new-window', (event, url) => {
  event.preventDefault()
  win = new BrowserWindow({show: false, webPreferences: {nodeIntegration: false}})
  win.once('ready-to-show', () => win.show())
  win.loadURL(url)
  event.newGuest = win
  });
};

// Run create window function
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit();
  }
});