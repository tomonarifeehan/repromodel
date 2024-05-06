import { Field } from "formik";
import React from "react";
import "./Field.css";
import SmartIntegerField from "./FieldTypes/SmartIntegerField";
import SmartFreeTextField from "./FieldTypes/SmartStringField";
import FormulaField from "./FieldTypes/FormulaField";
import SmartFloatField from "./FieldTypes/SmartFloatField";

function DefaultTextField({ id, label, name }) {
  return (
    <Field
      className="inputField"
      id={id}
      name={name}
      label={label}
      placeholder={`Please enter ${type}`}
    />
  );
}

function FlexibleFormField({ id, label, type, name, object }) {
  const renderSwitch = () => {
    switch (type) {
      case "str":
        return (
          <SmartFreeTextField
            id={id}
            label={label}
            name={name}
            object={object}
          />
        );
      case "float":
        return (
          <SmartFloatField id={id} label={label} name={name} object={object} />
        );
      case "int":
        return (
          <SmartIntegerField
            id={id}
            label={label}
            name={name}
            object={object}
          />
        );
      case "slider":
        return <SliderField id={id} label={label} name={name} />;
      case "type(lambda x: x)":
        return <FormulaField id={id} label={label} name={name} />;
      default:
        return (
          <DefaultTextField id={id} label={label} name={name} type={type} />
        );
    }
  };
  return <>{renderSwitch()}</>;
}

export default FlexibleFormField;
