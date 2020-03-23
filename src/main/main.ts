import * as path from "path"
import * as url from "url"

import { app, BrowserWindow, ipcMain } from "electron"

let mainWindow: Electron.BrowserWindow | null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: process.env.NODE_ENV !== "production",
    },
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "./index.html"),
      protocol: "file:",
      slashes: true,
    })
  )

  mainWindow.on("closed", () => {
    mainWindow = null
  })

  ipcMain.on("channel", (event, msg: any) => {
    console.log(msg)
    if (mainWindow) {
      mainWindow.webContents.send("response", { title: "mymessage", data: 1 })
    }
  })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (!mainWindow) {
    createWindow()
  }
})
