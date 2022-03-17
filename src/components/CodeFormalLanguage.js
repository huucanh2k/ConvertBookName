import React, { useState } from "react"
import styles from "./CodeFormalLanguage.module.scss"
import CodeEditor from "@uiw/react-textarea-code-editor"

const CodeFormalLanguage = ({ onChangeCode, code }) => {
  const onChange = (e) => {
    onChangeCode(e.target.value)
  }

  return (
    <div className={styles.codeEditorWrapper}>
      <CodeEditor
        value={code}
        language="js"
        placeholder="Vui lòng nhập"
        onChange={onChange}
        padding={15}
        style={{
          fontSize: 14,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          minHeight: "70%",
          marginRight: "40px",
        }}
      />
    </div>
  )
}

export default CodeFormalLanguage
