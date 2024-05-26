import React from "react"

import { Field } from "formik"

function SmartStringField({ id, label, object, name }) {
  
  // Attempt to parse the options from the object, if they exist.
  const optionsArray = object?.options ? JSON.parse(object.options.replace(/'/g, '"')) : []

  return (
    <>
      { optionsArray.length > 0 ? (
        
        <Field as = "select" className = "inputField" id = { id } name = { name }>
          <>
            <option value = "">Select an option...</option>
            
            { optionsArray.map((option, index) => (
              
              <option key = { index } value = { option }>
                { option }
              </option>
            
            ))}
          </>
        </Field>

      ) : (
        <Field
          className = "inputField"
          type = "text"
          id = { id }
          name = { name }
        />
      )}
    </>
  )
}

export default SmartStringField