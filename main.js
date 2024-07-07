const { app, BrowserWindow } = require('electron')
const URL = require("url").URL;

console.log("Starting")
console.log(`Args Count: ${process.argv.length}`)

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

const filteredArgs = process.argv.slice(1)

for (let url of filteredArgs) {
  if (stringIsAValidUrl(url)) {
    console.log(`Args: ${url}`)
  }
}

let createWindow = (url) => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    //icon: 'logo.ico',
    backgroundColor: "#fff",
    show: false,
  })
  win.on('ready-to-show', () => {
    win.maximize()
    win.show()
    //win.webContents.setZoomFactor(zoomFactor);
  })
  win.setMenu(null)
  win.loadURL(url)
}

app.whenReady().then(() => {
  for (let url of filteredArgs) {
    if (stringIsAValidUrl(url)) {
      console.log(`Opening window for: ${url}`)
      createWindow(url)
    }
  }
})

//*/
