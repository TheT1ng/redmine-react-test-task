import React from "react";

class SingleProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentMessage: ""
    };
  }

  onCommentInput = e =>
    this.setState({
      commentMessage: e.target.value
    });

  render() {
    const {
      name,
      description,
      identifier,
      onCommentLeave,
      onShowIssues,
      projectId,
      comments,
      onTrackOpen
    } = this.props;
    const { commentMessage } = this.state;
    return (
      <div className="row justify-content-center">
        <div className="shadow-sm d-flex flex-column justify-content-center align-items-center p-3 mt-3 bg-white rounded col-11 col-sm-8 col-md-6 col-lg-4">
          <h5 className="text-center">{name}</h5>
          <p className="align-self-start text-justify">{description}</p>
          <div className="w-100">
            <strong>Comments:</strong>
            <ol>
              {comments.map(elem => {
                if (elem) {
                  return <li key={Math.random()}>{elem}</li>;
                }
                return null;
              })}
            </ol>
          </div>
          <form className="row w-100 mb-3 d-flex flex-sm-column flex-md-row justify-content-center align-items-center">
            <input
              className="col col-11 col-sm-8 col-md-7 col-lg-7"
              type="text"
              placeholder="Comment..."
              value={commentMessage}
              onChange={this.onCommentInput}
            />
            <button
              className="col col-11 col-sm-8 col-md-5 col-lg-5 btn btn-primary btn-sm"
              type="submit"
              onClick={e => onCommentLeave(projectId, commentMessage, e)}
            >
              Leave a comment
            </button>
          </form>
          <button
            className="btn btn-success btn-lg mb-3 w-75"
            type="button"
            onClick={() => onTrackOpen(projectId)}
          >
            Track time
          </button>
          <button
            className="btn btn-dark btn-lg mb-3 w-75"
            type="button"
            onClick={() => onShowIssues(projectId)}
          >
            Show issues
          </button>
          <a
            className="badge badge-info"
            href={`https://redmine.ekreative.com/projects/${identifier}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <small>Project link</small>
          </a>
        </div>
      </div>
    );
  }
}

export default SingleProject;
