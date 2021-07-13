import Joi from "joi-browser";
import Form from "./common/form";
import userService from "../services/userService";
import PageHeader from "./common/pageHeader";
import { Redirect } from "react-router-dom";



class Signin extends Form {
  state = {
    formData: {
      email: "",
      password: "",
    },
    errors: {}
  };

  schema = {
    email: Joi.string().required().label("Name"),
    password: Joi.string().required().min(6).label("Password")
  };

  doSubmit = async () => {
    const { email, password } = this.state.formData;
    try {
      await userService.login(email, password);
      window.location = "/"
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: { email: err.response.data } })
      }
    }
  }


render() {
  if (userService.getCurrentUser()){
    return <Redirect to="/"/>
  }
  return (
  <div className="container">
    <PageHeader titleText="Sign In for MyStush" />

    <div className="row">
      <div className="col-12">
        <p>Sign in with your account</p>
      </div>
    </div>

    <div className="row">
      <div className="col-lg-6">
        <form onSubmit={this.handleSubmit} noValidate>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Sign in!!")}
        </form>
      </div>
    </div>
  </div>
  );
}
}

export default Signin;