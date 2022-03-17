import { useState } from "react"
import "./App.css"
import CodeFormalLanguage from "./components/CodeFormalLanguage"
import CodeJavaScript from "./components/CodeJavaScript"

function App() {
  const [codeFL, setCodeFL] = useState("")
  const [codeJS, setCodeJS] = useState("")

  const onChangeCode = (value) => {
    setCodeFL(value)
    setCodeJS(value.replace(/: /g, "-"))
  }

  return (
    <div className="App">
      <h1 style={{ textAlign: "center", marginBottom: "25px" }}>LOVE YOU ❤</h1>
      <div className="code-editor">
        <div className="code-fl">
          <CodeFormalLanguage onChangeCode={onChangeCode} code={codeFL} />
        </div>
        <div className="code-js">
          <CodeJavaScript codejs={codeJS} />
        </div>
      </div>
    </div>
  )
}
export default App
