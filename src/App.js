import "./App.css"
import { useState } from "react"
import CodeFormalLanguage from "./components/CodeFormalLanguage"
import CodeJavaScript from "./components/CodeJavaScript"

function App() {
  const [codeFL, setCodeFL] = useState("")
  const [codeJS, setCodeJS] = useState("")

  const onChangeCode = (newCode) => {
    setCodeFL(newCode)
  }
  const handleFuntionName = (functionName) => {
    let idxOpenMark = functionName.search("\\(")
    let idxDauDong = functionName.search("\\)")
    let functionNameOut = functionName.slice(0, idxOpenMark)
    let strParameter = functionName.slice(idxOpenMark + 1, idxDauDong)
    let arrParameter = strParameter.split(",")
    let arrObjParameter = arrParameter.map((item, index) => {
      let arrItem = item.split(":")
      return {
        nameVariable: arrItem[0],
        dataType: arrItem[1],
      }
    })

    let strVariableResult = functionName.slice(idxDauDong + 1)
    let arrVariableResult = strVariableResult.split(":")
    let objVariableResult = {
      nameVariable: arrVariableResult[0],
      dataType: arrVariableResult[1],
    }

    return {
      funtionName: functionNameOut,
      arrParameter: arrObjParameter,
      variableResult: objVariableResult,
    }
  }

  const handlePost = (strPost) => {
    console.log("String post: ", strPost)
    let result = ""
    let idxSlash = strPost.indexOf("||")
    if (idxSlash >= 0) {
      let arrPost = strPost.split("||")
      arrPost.forEach((item, index) => {
        let arrItem = item.split("&&")
        console.log("Check arr item", arrItem)
        let expression = arrItem[0].slice(2, -1)
        if (arrItem.length > 2) {
          let conditionMulti = ""
          for (let i = 1; i < arrItem.length; i++) {
            let condition =
              i === arrItem.length - 1
                ? arrItem[i].slice(1, -2)
                : arrItem[i].slice(1, -1)
            let checkSymbox
            if (
              condition.indexOf(">=") >= 0 ||
              condition.indexOf("<=") >= 0 ||
              condition.indexOf("!=") >= 0
            ) {
              condition = condition
            } else {
              condition = condition.replace("=", "==")
            }
            conditionMulti =
              i > 1
                ? conditionMulti.concat("&&", "(", condition, ")")
                : conditionMulti.concat("(", condition, ")")
          }
          result = result.concat(
            `${index === 0 ? "" : "\n\t"}if(${conditionMulti}) ${expression}`
          )
        } else {
          let condition = arrItem[1].slice(0, -1)
          if (
            condition.indexOf(">=") >= 0 ||
            condition.indexOf("<=") >= 0 ||
            condition.indexOf("!=") >= 0
          ) {
            condition = condition
          } else {
            condition = condition.replace("=", "==")
          }
          result = result.concat(
            `${index === 0 ? "" : "\n\t"}if${condition} ${expression}`
          )
        }
        console.log("Result: ", result)
      })
    }

    return result
  }
  const transformCode = () => {
    let strResult = ""
    let importVariable = ""
    let strDeclareVariable = ""
    let checkPre = ""
    let mainFunction = ""

    //Xu ly phan ten ham
    let arrCode = codeFL.split("\n")
    if (arrCode.length < 3) return
    let resultTenHam = handleFuntionName(arrCode[0])

    //Xu ly phan pre
    let expressionPre = arrCode[1].split(" ")[1]

    //Xu ly phan post
    let expressionPost = handlePost(
      arrCode[2].split(" ")[1],
      resultTenHam.variableResult.nameVariable
    )

    //Xu ly
    resultTenHam.arrParameter.forEach((item) => {
      let functionPart
      if (
        item.dataType === "R" ||
        item.dataType === "R*" ||
        item.dataType === "Z" ||
        item.dataType === "Z*"
      )
        functionPart = "parseFloat("
      if (item.dataType === "N" || item.dataType === "N*")
        functionPart = "parseInt("
      importVariable = importVariable.concat(
        `\n\t${item.nameVariable} = ${functionPart}prompt("Vui lòng nhập vào giá trị của biến ${item.nameVariable}"))`
      )
      strDeclareVariable = strDeclareVariable.concat(
        `let ${item.nameVariable}\n`
      )
    })

    checkPre = `function check${resultTenHam.funtionName}(){\n\n\tif(${expressionPre}) return true\n\treturn false\n\n}`

    mainFunction = `function ${resultTenHam.funtionName}(){\n\n\timport${resultTenHam.funtionName}()
    \tif(!check${resultTenHam.funtionName}()) { \n\t\talert("Các biến bạn nhập vào không đảm bảo điều kiện!") \n\t\treturn\n\t}
    \tlet ${resultTenHam.variableResult.nameVariable}
    \t${expressionPost}
    \tlet logOutput = "Kết quả của chương trình là: " + ${resultTenHam.variableResult.nameVariable}
    \talert(logOutput)\n\n}
    `

    console.log("Check: ", strDeclareVariable, importVariable)
    console.log(resultTenHam)
    let functionImport = `\nfunction import${resultTenHam.funtionName}(){
      ${importVariable}\n\n}`
    strResult = `${strDeclareVariable}\n${mainFunction}\n${resultTenHam.funtionName}()\n${functionImport}\n\n${checkPre}`
    setCodeJS(strResult)
  }

  return (
    <div className="App">
      <div className="code-editor">
        <div className="code-fl">
          <CodeFormalLanguage onChangeCode={onChangeCode} code={codeFL} />
        </div>
        <button
          className="btnTransfCode"
          onClick={transformCode}
          title="Chuyển đổi code"
        >
          <i className="fas fa-arrow-right"></i>
        </button>
        <div className="code-js">
          <CodeJavaScript codejs={codeJS} />
        </div>
      </div>
    </div>
  )
}
export default App
