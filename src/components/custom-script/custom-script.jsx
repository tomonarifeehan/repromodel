import { Form } from "formik"
import { handleCustomScriptSubmit } from "../../utils/json-helpers"
import { handleDownload } from "../../utils/download-helpers"
import { highlight, languages } from "prismjs/components/prism-core"

import axios from "axios"
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CustomSelectComponent from "../ui/custom-select"
import dedent from "dedent"
import Editor from "react-simple-code-editor"
import React from "react"

import "./custom-script.css"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-python"
import "prismjs/themes/prism.css"

const categories = [
  { value: "augmentations", label: "augmentations" },
  { value: "datasets", label: "datasets" },
  { value: "early_stopping", label: "early_stopping" },
  { value: "losses", label: "losses" },
  { value: "metrics", label: "metrics" },
  { value: "models", label: "models" },
  { value: "postprocessing", label: "postprocessing" },
  { value: "preprocessing", label: "preprocessing" }
]

const CustomScript = ({}) => {

  const [category, setCategory] = React.useState(categories[0])

  const [code, setCode] = React.useState(
    dedent`
    Select the kind of custom script you want to create. 
    Make sure you have the backend running. 
    `
  )

  const fetchCustomScriptTemplate = async (type) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5005/get-custom-script-template",
        { params: { type } }
      )
      setCode(response.data)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return (
    <Form className = "custom-script-container">

      <div className = "custom-script-heading">
        <span style = { { fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif", fontSize: "12px", fontWeight: "600" } }>What kind of custom script?</span>
      </div>


      {/* Supported Categories */}
      <div className = "category-container">
        
        <CustomSelectComponent
          className = "category-dropdown"
          isMulti = { false }
          options = { categories }
          value = { category }
          onChange = { (option) => { setCategory(option) } }
        />

        <button
          className = "load-template-button"
          onClick = { () => {
            fetchCustomScriptTemplate(category.value)
          }}
        >
          Load Template
        </button>

      </div>


      {/* Custom Script Editor */}
      <div className = "custom-script-container-content" style = { { width: "100%" } }>
              
        <div className = "custom-script-container-editor-area" style = { { position: "relative" } }>
          <div title = "Copy">
            <ContentCopyIcon
              onClick = { () => navigator.clipboard.writeText(code) }
              sx = { { "&:hover": { opacity: "30%" }, opacity: "50%", position: "absolute", top: "10px", right: "15px", zIndex: "100", cursor: "pointer" } }
            />
          </div>
          <Editor
            className = "custom-script-container-editor"
            value = { code }
            onValueChange = { (code) => setCode(code) }
            highlight = { (code) => highlight(code, languages.py) }
          />

        </div>

      </div>        
      
      <div className = "custom-script-save-container">

          {/* Output File */}
          <input id = "custom-script-file-name-input" className = "custom-script-file-name-input" type = "text" placeholder = "File Name (without .py)"/>
          
          {/* Save Buttons */}
          <button
            type = "submit"
            className = "custom-script-save-button"
            onClick = { () => {

              const fileNameElement = document.getElementById("custom-script-file-name-input")
              const fileNameValue = fileNameElement.value
              
              handleCustomScriptSubmit(code, fileNameValue, category.value)
            }}
          >
            Save
          </button>

          {/* <button
            type = "submit"
            className = "button right-button"
            onClick = { () => {
              handleDownload(code, `Custom${capitalizeFirstLetter(category.value)}Script`, "py")
            }}
          >
            Download
          </button> */}

      </div>

    </Form>
  )
}

export default CustomScript