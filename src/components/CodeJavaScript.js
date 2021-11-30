import React from "react"
import styles from "./CodeJavaScript.module.scss"
import CodeEditor from "@uiw/react-textarea-code-editor"

const CodeJavaScript = ({ codejs }) => {
  // const [code, setCode] = React.useState(codejs)
  return (
    <div className={styles.codeContainer}>
      {/* <textarea
        name="code-javacript"
        cols="30"
        rows="10"
        className={styles.codeEditor}
        value={codejs}
      ></textarea> */}
      <CodeEditor
        value={codejs}
        language="js"
        placeholder="Chờ nhập dữ liệu đặc tả hình thức và bấm vào nút chuyển đổi"
        padding={15}
        readOnly={true}
        style={{
          fontSize: 14,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          minHeight: "50%",
        }}
      />
    </div>
  )
}

export default CodeJavaScript
