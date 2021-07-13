import React from "react";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class BizSignup extends Form {
  state = {
    formData: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().min(6).label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  async doSubmit() {
    const body = { ...this.state.formData, biz: true };
    try {
      await http.post(`${apiUrl}/users`, body);

      const {email,password}=body;
      await userService.login(email,password);
      window.location = "/create-post"
     
    } catch (err) {
      console.dir(err);
      if (err.response && err.response.status === 400) {
        this.setState({
          errors: {
            email: "Email is taken",
          },
        });
      }
    }
  }

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <PageHeader titleText="SignUp for MyStush" />

        <div className="row">
          <div className="col-12">
            <p>You can open a new account for free</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} noValidate>
              {this.renderInput("name", "User Name")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Next!!")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BizSignup;
