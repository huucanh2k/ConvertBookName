import React from "react"
import styles from "./CodeJavaScript.module.scss"
import CodeEditor from "@uiw/react-textarea-code-editor"

const CodeJavaScript = ({ codejs }) => {
  // const [code, setCode] = React.useState(codejs)

  const runCode = (e) => {
    try {
      eval(codejs)
    } catch (e) {
      throw new Error()
    }
  }

  const onCopyClick = () => {
    if (!navigator.clipboard) {
      return
    }
    navigator.clipboard.writeText(codejs).then(
      function () {
        console.log("Async: Copying to clipboard was successful!")
      },
      function (err) {
        console.error("Async: Could not copy text: ", err)
      }
    )
  }

  return (
    <div className={styles.codeContainer}>
      <CodeEditor
        value={codejs}
        language="js"
        placeholder="Đợi"
        padding={15}
        readOnly={true}
        style={{
          fontSize: 14,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          minHeight: "70%",
        }}
      />
      <button className={styles.btnRunCode} onClick={onCopyClick}>
        Copy
      </button>
    </div>
  )
}

export default CodeJavaScript
