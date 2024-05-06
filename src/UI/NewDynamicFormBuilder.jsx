import React from "react";
import { Formik, Form, Field } from "formik";


import NewFlexibleFormField from "./FormComponents/NewFlexibleFormField";
import "./FormComponents/Field.css";
import newQuestions from "../choicesJSON/newQuestionsFormat.json";
import { Typography } from "@mui/material";


function validateJSON(text) {
  try {
    JSON.parse(text);
    return true;  // valid JSON
  } catch (error) {
    return false;  // invalid JSON
  }
}



const DynamicFormBuilder = () => {
  // Generate initial values from questions data
  const initialValues = Object.values(newQuestions).reduce(
    (values, question) => {
      values[question.id] = ""; // Set initial value as empty
      return values;
    },
    {}
  );
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        if (validateJSON(text)) {
         
          alert('Valid JSON file');
          
        } else {
          alert('Invalid JSON file');
         
        }
      };
      reader.readAsText(file);
    }
  };

   // Function to handle form submission
   const handleSubmit = (values) => {
    // Log values to the console
    console.log("Submitted Values:", values);

    // Convert values object to JSON string
    const jsonString = JSON.stringify(values, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create an anchor element and trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "config.json";  // Name of the file to download
    document.body.appendChild(link);  // Append to the page
    link.click();                     // Trigger the download

    // Clean up: remove the link and revoke the blob URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <h1>Experiment Builder</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            {/* Optional JSON File upload */}
            <Typography>Optionally upload existing config File</Typography>
            <input type="file" id="uploadedJson" accept=".json" onChange={handleFileChange}/>
            {/* For each Folder */}
            {Object.entries(newQuestions).map(([folder, folderContent]) => (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4> {capitalizeFirstLetter(folder)}</h4>
                
                  
                  {Object.entries(folderContent).map(([file, fileContent]) => (
                    <>
                      {" "}
                      {Object.entries(fileContent).map(
                        ([className, fileContent]) => (
                          <label>
                          <Field type="checkbox" name={folder} value={className}></Field>
                          {className}
                          </label>
                        )
                      )}
                    </>
                  ))}
               
                {/* For each Filename */}
                {Object.entries(folderContent).map(([file, fileContent]) => (
                  <>
                    {/* For each Class in the File */}
                    {Object.entries(fileContent).map(
                      ([className, classContent]) => (
                        <div style={{ paddingLeft: "16px" }}>
                          
                       
                          {values[folder] && values[folder].includes(className) && (
                            <div style={{ display: "flex", flexDirection: "column" ,border: "2px solid #000000",
                            borderRadius: "10px", padding:"8px" , margin:"8px" }}>
                              <p>{className} Params</p>

                              {/* Conditionally renders Param Questions if the class is selected */}
                              
                              {Object.entries(classContent).map(
                                ([Param, value]) => (
                                    <>
                                   <label htmlFor={`${className}:${Param}`}>{Param}:</label>
                                  <NewFlexibleFormField id={`${className}:${Param}`} object={value} type={value.type} name={`${className}:${Param}`} label={Param}/>
                                  </>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </>
                ))}
              </div>
            ))}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicFormBuilder;
