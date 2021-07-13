import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import postsService  from "../services/postsService";

class CreatePost extends Form {
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

  doSubmit = async () => {
    const { bizImage, ...data } = this.state.formData;
    if (bizImage) {
      data.bizImage = bizImage;
    }
    await postsService.createPost(data);
    toast("A new post was created");
    this.props.history.replace("/my-posts");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Create new Post" />

        <div className="row">
          <div className="col-12">
            <p>Create new Post</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} noValidate>
              {this.renderInput("bizName", "Name")}
              {this.renderInput("bizDescription", "Description")}
              {this.renderInput("bizAddress", "Address")}
              {this.renderInput("bizPhone", "Phone")}
              {this.renderInput("bizImage", "Image", "file")}
              {this.renderButton("Create Post")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
