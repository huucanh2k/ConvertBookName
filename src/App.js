import "./App.css"
import { useLayoutEffect, useState } from "react"
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

  const handleFormatValueLoop = (str) => {
    console.log("<<Check handle format: ", str)
    if (!isNaN(parseInt(str))) {
      str = str - 1
      return str
    } else {
      if (str.indexOf("-") >= 0) {
        str = str.replace("-1", "-2")
      } else {
        str = str.concat("-1")
      }
      return str
    }
  }

  const handlePost = (strPost) => {
    let result = ""
    let idxSlash = strPost.indexOf("||")
    if (idxSlash >= 0) {
      let arrPost = strPost.split("||")
      arrPost.forEach((item, index) => {
        let arrItem = item.split("&&")
        let expression = arrItem[0].slice(2, -1)
        if (arrItem.length > 2) {
          let conditionMulti = ""
          for (let i = 1; i < arrItem.length; i++) {
            let condition =
              i === arrItem.length - 1
                ? arrItem[i].slice(1, -2)
                : arrItem[i].slice(1, -1)
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
      })
    } else {
      console.group(">>Check")
      let checkLoop = strPost.indexOf("TH")
      if (checkLoop === -1) result = strPost.slice(1, -1)
      else {
        console.log("Check string post: ", strPost)
        let idxEqual = strPost.indexOf("=")
        let varName = strPost.slice(0, idxEqual)
        let expression = strPost.slice(idxEqual + 1)
        console.log("Expression: ", expression)
        let countLoop = expression.split("TH").length - 1
        let idxStartLoop =
          expression.lastIndexOf("VM") > 1
            ? expression.lastIndexOf("VM")
            : expression.lastIndexOf("TT")
        console.log("Start loop: ", idxStartLoop)
        if (idxStartLoop >= 0) {
          let loopFirst = expression.slice(1, idxStartLoop - 1)
          let loopSecond = expression.slice(idxStartLoop, -1)
          let idx = loopSecond.indexOf("}")
          console.log("Idex: ", idx)
          let expressionLoop = loopSecond.slice(idx + 2)
          expressionLoop = expressionLoop.replace(/[(]/g, "[")
          expressionLoop = expressionLoop.replace(/[)]/g, "]")
          loopSecond = loopSecond.slice(0, idx + 1)
          let varNameLoopFirst = loopFirst.charAt(loopFirst.indexOf("TH") - 1)
          let varNameLoopSecond = loopSecond.charAt(
            loopSecond.indexOf("TH") - 1
          )
          let varNameMain = loopFirst.charAt(loopFirst.indexOf("..") + 2)
          let valueStartLoopFirst = loopFirst.slice(
            loopFirst.indexOf("{") + 1,
            loopFirst.indexOf("..")
          )
          let valueEndLoopFirst = loopFirst.slice(
            loopFirst.indexOf("..") + 2,
            loopFirst.indexOf("}")
          )
          let valueStartLoopSecond = loopSecond.slice(
            loopSecond.indexOf("{") + 1,
            loopSecond.indexOf("..")
          )
          let valueEndLoopSecond = loopSecond.slice(
            loopSecond.indexOf("..") + 2,
            loopSecond.indexOf("}")
          )
          valueStartLoopFirst = handleFormatValueLoop(valueStartLoopFirst)
          valueEndLoopFirst = handleFormatValueLoop(valueEndLoopFirst)
          valueEndLoopSecond = handleFormatValueLoop(valueEndLoopSecond)
          if (loopFirst.indexOf("VM") >= 0) {
            result = result.concat(
              `let result = true\n\tfor(let ${varNameLoopFirst} = ${valueStartLoopFirst}; ${varNameLoopFirst} <= ${valueEndLoopFirst}; ${varNameLoopFirst}++){\n\t\tlet resultFirst = true`
            )
            if (loopSecond.indexOf("VM") >= 0) {
              result = result.concat(
                `\n\t\tfor(let ${varNameLoopSecond} = ${valueStartLoopSecond}; ${varNameLoopSecond} <= ${valueEndLoopSecond}; ${varNameLoopSecond}++){\n\t\t\tresultFirst = true\n\t\t\tif(!(${expressionLoop})) { \n\t\t\t\tresultFirst = false\n\t\t\t\tbreak\n\t\t\t}\n\t\t}\n\t\tif(!resultFirst) {\n\t\t\tresult = false\n\t\t\tbreak\n\t\t}\n\t}\n\t${varName} = result
                `
              )
            } else {
              result = result.concat(
                `\n\t\tfor(let ${varNameLoopSecond} = ${valueStartLoopSecond}; ${varNameLoopSecond} <= ${valueEndLoopSecond}; ${varNameLoopSecond}++){\n\t\t\tresultFirst = false\n\t\t\tif(${expressionLoop}) {\n\t\t\t\tresultFirst = true\n\t\t\t\tbreak\n\t\t\t} \n\t\t}\n\t\tif(!resultFirst) {\n\t\t\tresult = false \n\t\t\tbreak\n\t\t}\n\t}\n\t${varName} = result
              `
              )
            }
          } else {
            result = result.concat(
              `let result = false\n\tfor(let ${varNameLoopFirst} = ${valueStartLoopFirst}; ${varNameLoopFirst} <= ${valueEndLoopFirst}; ${varNameLoopFirst}++){\n\t\tlet resultFirst = false`
            )
            if (loopSecond.indexOf("VM") >= 0) {
              result = result.concat(
                `\n\t\tfor(let ${varNameLoopSecond} = ${valueStartLoopSecond}; ${varNameLoopSecond} <= ${valueEndLoopSecond}; ${varNameLoopSecond}++){\n\t\t\tresultFirst = true\n\t\t\tif(!(${expressionLoop})) { \n\t\t\t\tresultFirst = false\n\t\t\t\tbreak\n\t\t\t}\n\t\t}\n\t\tif(resultFirst) {\n\t\t\tresult = true\n\t\t\tbreak\n\t\t}\n\t}\n\t${varName} = result
                `
              )
            } else {
              result = result.concat(
                `\n\t\tfor(let ${varNameLoopSecond} = ${valueStartLoopSecond}; ${varNameLoopSecond} <= ${valueEndLoopSecond}; ${varNameLoopSecond}++){\n\t\t\tresultFirst = false\n\t\t\tif(${expressionLoop}) {\n\t\t\t\tresultFirst = true\n\t\t\t\tbreak\n\t\t\t} \n\t\t}\n\t\tif(resultFirst) {\n\t\t\tresult = true \n\t\t\tbreak\n\t\t}\n\t}\n\t${varName} = result
              `
              )
            }
          }

          console.log({
            loopFirst,
            loopSecond,
            varNameLoopFirst,
            varNameLoopSecond,
            varNameMain,
            expressionLoop,
            valueStartLoopFirst,
            valueEndLoopFirst,
            valueStartLoopSecond,
            valueEndLoopSecond,
          })

          console.log("Result: \n", result)
        }
        console.log("Arr: ", varName, expression, countLoop, idxStartLoop)
      }
      console.groupEnd()
    }

    return result
  }
  const transformCode = () => {
    let strResult = ""
    let importVariable = ""
    let strDeclareVariable = ""
    let checkPre = ""
    let mainFunction = ""
    let expressionPre = ""
    let expressionPost = ""
    let resultTenHam = ""
    let code = codeFL
    //Xu ly phan ten ham
    code = code.replace(/\s/g, "")
    code = code.replace("pre", "\npre ")
    code = code.replace("post", "\npost ")
    let arrCode = code.split("\n")

    if (arrCode.length > 0) {
      resultTenHam = handleFuntionName(arrCode[0])
    }

    //Xu ly phan pre
    if (arrCode.length > 1) {
      expressionPre = arrCode[1].split(" ")[1] ? arrCode[1].split(" ")[1] : true
    }

    //Xu ly phan post
    if (arrCode.length > 2) {
      expressionPost = handlePost(
        arrCode[2].split(" ")[1] ? arrCode[2].split(" ")[1] : "",
        resultTenHam?.variableResult?.nameVariable
      )
    }

    //Xu ly
    for (let i = 0; i < resultTenHam?.arrParameter.length; i++) {
      let item = resultTenHam?.arrParameter[i]
      console.log(item)
      if (
        item.dataType === "R*" ||
        item.dataType === "N*" ||
        item.dataType === "Z*"
      ) {
        console.log("Phat hien mang")
        let functionPart
        if (item.dataType === "R*" || item.dataType === "Z*")
          functionPart = "parseFloat("
        if (item.dataType === "N*") functionPart = "parseInt("

        importVariable = importVariable.concat(
          `\n\t${
            resultTenHam?.arrParameter[i + 1].nameVariable
          } = parseInt( prompt("Vui lòng nhập vào số lượng phần tử của mảng: "))`
        )
        importVariable = importVariable.concat(
          `\n\tfor(let i = 0; i < ${
            resultTenHam?.arrParameter[i + 1].nameVariable
          }; i++) {
            let temp = ${functionPart}prompt("Vui lòng nhập vào giá trị của phần tử " + (i + 1)))
            ${item.nameVariable}.push(temp)\n\t}`
        )
        strDeclareVariable = strDeclareVariable.concat(
          `let ${item.nameVariable} = []\nlet ${
            resultTenHam?.arrParameter[i + 1].nameVariable
          }`
        )
        break
      }
      let functionPart
      if (item.dataType === "R" || item.dataType === "Z")
        functionPart = "parseFloat("
      if (item.dataType === "N") functionPart = "parseInt("
      importVariable = importVariable.concat(
        `\n\t${item.nameVariable} = ${functionPart}prompt("Vui lòng nhập vào giá trị của biến ${item.nameVariable}"))`
      )
      strDeclareVariable = strDeclareVariable.concat(
        `let ${item.nameVariable}\n`
      )
    }
    // resultTenHam?.arrParameter.forEach((item, index) => {

    // })

    checkPre = `function check${resultTenHam?.funtionName}(){\n\n\tif(${expressionPre}) return true\n\treturn false\n\n}`

    mainFunction = `function ${resultTenHam?.funtionName}(){\n\n\timport${resultTenHam?.funtionName}()
    \tif(!check${resultTenHam?.funtionName}()) { \n\t\talert("Các biến bạn nhập vào không đảm bảo điều kiện!") \n\t\treturn\n\t}
    \tlet ${resultTenHam?.variableResult?.nameVariable}
    \t${expressionPost}
    \tlet logOutput = "Kết quả của chương trình là: " + ${resultTenHam?.variableResult?.nameVariable}
    \talert(logOutput)\n\n}
    `

    let functionImport = `\nfunction import${resultTenHam?.funtionName}(){
      ${importVariable}\n\n}`
    strResult = `${strDeclareVariable}\n${mainFunction}\n${resultTenHam?.funtionName}()\n${functionImport}\n\n${checkPre}`
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
