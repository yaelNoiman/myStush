import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import postsService from "../services/postsService";
import { Link } from "react-router-dom";

class EditPost extends Form {
  state = {
    formData: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    bizName: Joi.string().min(2).max(255).required().label("Name"),
    bizDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Description"),
    bizAddress: Joi.string().min(2).max(400).required().label("Address"),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    bizImage: Joi.string().min(11).max(1024).uri().allow("").label("Image"),
  };

  async componentDidMount() {
    const { data } = await postsService.getPost(this.props.match.params.id);
    this.setState({ formData: this.mapToState(data) });
  }

  mapToState(post) {
    const {
      bizName,
      bizDescription,
      bizAddress,
      bizPhone,
      bizImage,
      _id,
    } = post;

    return { bizName, bizDescription, bizAddress, bizPhone, bizImage, _id };
  }

  doSubmit = async () => {
    const { formData } = this.state;
      await postsService.editPost(formData);
    toast("Post is updated");
    this.props.history.replace("/my-posts");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Update your post" />

        <div className="row">
          <div className="col-12">
            <p>Update your Post</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} noValidate>
              {this.renderInput("bizName", "Name")}
              {this.renderInput("bizDescription", "Description")}
              {this.renderInput("bizAddress", "Address")}
              {this.renderInput("bizPhone", "Phone")}
              {this.renderInput("bizImage", "Image")}
              {this.renderButton("Update Post")} 
              <Link to="/my-posts">Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPost;
