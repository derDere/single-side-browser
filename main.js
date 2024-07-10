const { app, BrowserWindow } = require('electron')
const URL = require('url').URL

console.log('Starting')

const createWindow = (url) => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1000,
    //icon: icon,
    backgroundColor: '#fff',
    show: false,
  })

  win.on('ready-to-show', () => {
    win.maximize()
    win.show()
  })
  win.setMenu(null)
  win.loadURL(url)
    .then(() => {})
    .catch((error) => {
      console.error(`Error loading URL: ${url}`)
      console.error(error)

      win.close()
    })
}

app.whenReady().then(() => {
  console.log(`Args Count: ${process.argv.length}`)
  console.log(`Args: ${process.argv}`)

  let windowCount = 0

  for (const arg of process.argv.slice(1)) {
    const preparedArg = `https://${arg}`

    if (!URL.canParse(preparedArg)) {
      console.error(`Invalid URL: ${arg}`)

      continue
    }
   
    console.log(`Opening window for: ${preparedArg}`)

    windowCount++

    createWindow(preparedArg)
  }

  if (windowCount === 0) {
    app.quit()
  }
})

// quit app process when all windows are closed
app.on('window-all-closed', () => {
  app.quit()
})
