const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron')

const path = require('path')

let win

const gotTheLock = app.requestSingleInstanceLock()


if (gotTheLock) {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) {
        win.restore()
      } else if (!win.isVisbile) {
        win.show()
      }

      win.focus()
    }
  })


  app.whenReady().then(() => {

    win = new BrowserWindow({
      width: 1280,
      height: 720,
      frame: false,
      icon: path.join(__dirname, 'favicon.ico'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })


    win.loadFile(path.join(__dirname, 'index.html'))

    handleTray()

    // win.webContents.openDevTools()

    ipcMain.on('TITLE_BAR_ACTION', (event, args) => {
      handleTitleBarActions(win, args)
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
} else {
  app.quit()
}

function handleTray() {
  const tray = new Tray(path.join(__dirname, 'favicon.ico'))

  tray.setToolTip('ProToChat')

  tray.on('click', function () {
    win.show()
  })

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show', click: function () {
        win.show()
      }
    },
    {
      label: 'Quit', click: function () {
        app.isQuiting = true
        app.quit()
      }
    }
  ]))
}

function handleTitleBarActions(windowObj, args) {
  if (args === 'MAXIMIZE_WINDOW') {
    if (windowObj.isMaximized() === true) {
      windowObj.unmaximize()
    }
    else {
      windowObj.maximize()
    }
  }
  else if (args === 'MINIMIZE_WINDOW')
    windowObj.minimize()
  else if (args === 'CLOSE_APP')
    windowObj.hide()
}