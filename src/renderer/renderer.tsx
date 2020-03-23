import * as React from "react"
import * as ReactDOM from "react-dom"

const { ipcRenderer } = window

ipcRenderer.on("response", (event, args) => {
  console.log(args)
})

const sendMessage = () =>
  ipcRenderer.send("channel", {
    title: "hi",
    content: "hello this is my message",
  })

ReactDOM.render(
  <div className="app">
    <button onClick={sendMessage}>Click me</button>
    <h4>Welcome to React, Electron and Typescript</h4>
    <p>Hello</p>
  </div>,
  document.getElementById("app")
)
