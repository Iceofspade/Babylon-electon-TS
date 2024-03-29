import {app, BrowserWindow} from'electron' 
import path from 'path'
import url from 'url'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win:BrowserWindow|null;
let createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
    }

    // icon:"img/dice.png"
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
      pathname: path.join(__dirname, "../app/index.html"),
      protocol: "file:",
      slashes: true,
  }));

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
    
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
