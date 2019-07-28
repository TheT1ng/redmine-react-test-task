import React from "react";
import { connect } from "react-redux";
import SingleIssue from "./SingleIssue";

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
      onHideIssues,
      projectId,
      comments,
      issuesList,
      isSuccess,
      onProjectTrack
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
          <div className="row w-100 mb-3 d-flex flex-sm-column flex-md-row justify-content-center align-items-center">
            <input
              className="col col-11 col-sm-8 col-md-7 col-lg-7"
              type="text"
              placeholder="Comment..."
              value={commentMessage}
              onChange={this.onCommentInput}
            />
            <button
              className="col col-11 col-sm-8 col-md-5 col-lg-5 btn btn-primary btn-sm"
              type="button"
              onClick={() => onCommentLeave(projectId, commentMessage)}
            >
              Leave a comment
            </button>
          </div>
          <button
            className="btn btn-success btn-lg mb-3 w-75"
            type="button"
            data-toggle="modal"
            data-target="#trackingModal"
            // onClick={() => onProjectTrack(projectId, 9, "From component test")}
          >
            Track time
          </button>
          {isSuccess ? (
            <button
              className="btn btn-danger btn-lg mb-3 w-75"
              type="button"
              onClick={onHideIssues}
            >
              Hide issues
            </button>
          ) : (
            <button
              className="btn btn-dark btn-lg mb-3 w-75"
              type="button"
              onClick={() => onShowIssues(projectId)}
            >
              Show issues
            </button>
          )}
          {issuesList.map((elem, index) => (
            <SingleIssue
              key={elem.id}
              author={elem.author.name}
              created={elem.created_on}
              priority={elem.priority.name}
              status={elem.status.name}
              subject={elem.subject}
              updated={elem.updated_on}
              orderNum={index + 1}
            />
          ))}
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

const mapStateToProps = state => {
  return {
    isFail: state.issuesReducer.isFail,
    isSuccess: state.issuesReducer.isSuccess
  };
};

export default connect(mapStateToProps)(SingleProject);