import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class Form extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    //preventDefault - that the page will not refreshed and do the validations
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (!errors) {
      this.doSubmit();
    }
  };

  validateProperty(name, value) {
    const schema = { [name]: this.schema[name] };
    const obj = { [name]: value };

    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  validate = () => {
    const {
      state: { formData },
      schema,
    } = this;

    const { error } = Joi.validate(formData, schema, { abortEarly: false });

    if (!error) {
      return null;
    }

    const errors = {};
    for (const { path, message } of error.details) {
      errors[path[0]] = message;
    }
    return errors;
  };

  handleChange = ({ target: { value, name } }) => {
    const { errors, formData } = this.state;
    
    //validate input
    const errorsCopy = { ...errors };
    const errorMessage = this.validateProperty(name, value);
    if (errorMessage) {
      errorsCopy[name] = errorMessage;
    } else {
      delete errorsCopy[name];
    }

    //form data
    const updateFormData = { ...formData };
    updateFormData[name] = value;

    //update state
    this.setState({ formData: updateFormData, errors:errorsCopy });
  };

  renderInput(name, label, type = "text") {
    const { formData, errors } = this.state;

    return (
      <Input
        type={type}
        value={formData[name]}
        onChange={this.handleChange}
        error={errors[name]}
        name={name}
        label={label}
      />
    );
  }

  renderButton(label = "") {
    return <button className="btn btn-primary">{label}</button>;
  }
}

export default Form;
