const electronReload = require("electron-reload");
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { initialize, enable } = require('@electron/remote/main');
const fs = require('fs');

initialize();
electronReload(__dirname, {});

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  enable(mainWindow.webContents);

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Add these IPC handlers

ipcMain.handle('get-files', async (event, agentId) => {
  const url = path.join(app.getPath('userData'), 'Backend', 'Files', agentId);
  if (fs.existsSync(url)) {
    return fs.readdirSync(url);
  }
  return [];
});

ipcMain.handle('show-open-dialog', async (event) => {
  return dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
});

ipcMain.handle('upload-files', async (event, agentId, filePaths) => {
  // const url = `Backend/Files/${agentId}`;
  const url = path.join(app.getPath('userData'), 'Backend', 'Files', agentId);
  if (!fs.existsSync(url)) {
    console.log("file uploaded to local file")
    fs.mkdirSync(url, { recursive: true });
  }

  filePaths.forEach((filePath) => {
    const fileName = path.basename(filePath);
    fs.copyFileSync(filePath, path.join(url, fileName));
  });

  return fs.readdirSync(url);
});


ipcMain.handle('upload-embedded-files', async (event, agentId, filePaths) => {
  // const url = `Backend/Files/${agentId}`;
  const url = path.join(app.getPath('userData'), 'Backend', 'EmbeddedFiles', agentId);
  if (!fs.existsSync(url)) {
    console.log("file uploaded to local file")
    fs.mkdirSync(url, { recursive: true });
  }

  filePaths.forEach((filePath) => {
    const fileName = path.basename(filePath);
    fs.copyFileSync(filePath, path.join(url, fileName));
  });

  return fs.readdirSync(url);
});


ipcMain.handle('get-embedded-files', async (event, agentId) => {
  const url = path.join(app.getPath('userData'), 'Backend', 'EmbeddedFiles', agentId);
  if (fs.existsSync(url)) {
    return fs.readdirSync(url);
  }
  return [];
});

ipcMain.handle('get-user-data-path', () => {
  return app.getPath('userData');
});

















// const electronReload = require("electron-reload");
// const { app, BrowserWindow, ipcMain } = require('electron');
// const path = require('path');
// const { initialize, enable } = require('@electron/remote/main');


// initialize();
// electronReload(__dirname, {});



// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     // width: 800,
//     // height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'), // Path to preload script
//       nodeIntegration: true, // Enable Node.js integration
//       contextIsolation: false, // Disable context isolation for easier integration
//     },
//   });

//   enable(mainWindow.webContents);

//   mainWindow.loadFile(path.join(__dirname, 'index.html')); // Load main HTML file
// }

// app.whenReady().then(createWindow);

// // Handle macOS specific behavior
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// // Quit when all windows are closed, except on macOS
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });
