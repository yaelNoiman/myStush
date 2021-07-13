import { Link } from "react-router-dom";

const Post = ({
  post: { _id, bizAddress, bizDescription, bizImage, bizName, bizPhone }
}) => {
  return (
    <div className="card col-md-6 col-lg-4 m-4" style={{ width: "18rem" }}>
      <img className="card-img-top" src={bizImage} alt="Business logo" />
      <div className="card-body">
        <h5 className="card-title">{bizName}</h5>
        <p className="card-text">{bizDescription}</p>
        <address>{bizAddress}</address>
        <p>{bizPhone}</p>
        <Link className="btn btn-primary" to={`./edit/${_id}`}>
          Edit
        </Link>
        <button className="btn btn-danger ml-3">Delete</button>
      </div>
    </div>
  );
};

export default Post;
