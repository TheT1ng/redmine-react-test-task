import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SingleProject from "./SingleProject";
import SingleIssue from "./SingleIssue";
import {
  projectsRequest,
  projectComment,
  projectTimeTrack
} from "../actionCreators/projectsActionCreators";
import { issuesRequest } from "../actionCreators/issuesActionCreators";
import { issuesHide } from "../actions/issuesActions";
import { projectTrack } from "../actions/projectsActions";

class ProjectsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: false,
      hours: 0,
      message: ""
    };
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  onCommentLeave = (projectId, message) => {
    const { onComment } = this.props;
    return onComment({
      projectId,
      message
    });
  };

  onShowIssues = projectId => {
    const { onShowIssues } = this.props;
    this.setState({
      isModalOpened: false
    });
    return onShowIssues(projectId);
  };

  onTrackOpen = (projectId, issueId) => {
    const { onHideIssues, onTrackOpen } = this.props;
    onHideIssues();
    onTrackOpen(projectId, issueId);
    this.setState({
      isModalOpened: true
    });
  };

  onTrackInput = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onTrackSubmit = () => {
    const { onProjectTrack, trackingProjectId, trackingIssueId } = this.props;
    const { hours, message } = this.state;
    onProjectTrack(trackingProjectId, hours, message, trackingIssueId);
    this.setState({
      hours: 0,
      message: "",
      isModalOpened: false
    });
  };

  onModalClose = () =>
    this.setState({
      isModalOpened: false
    });

  render() {
    const { hours, message, isModalOpened } = this.state;
    const {
      projectsList,
      isLoading,
      projectComments,
      issuesList,
      onHideIssues
    } = this.props;
    if (sessionStorage.getItem("isUserLogged") && true) {
      return (
        <div className="projectsContainer pt-4">
          <div className="row justify-content-center">
            <div className="col-11 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center">
              <h3 className="font-weight-bold text-uppercase text-center">
                list of all projects
              </h3>
            </div>
          </div>
          {isLoading ? (
            <div className="w-100 mt-5 d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" />
            </div>
          ) : (
            projectsList.map(elem => (
              <SingleProject
                key={elem.id}
                name={elem.name}
                description={elem.description}
                identifier={elem.identifier}
                projectId={elem.id}
                onCommentLeave={this.onCommentLeave}
                onShowIssues={this.onShowIssues}
                onHideIssues={onHideIssues}
                onTrackOpen={this.onTrackOpen}
                comments={projectComments.map(comment => {
                  if (comment.projectId === elem.id) {
                    return comment.message;
                  }
                  return null;
                })}
              />
            ))
          )}
          {issuesList.length === 0 ? null : (
            <div className="fixedWindow position-fixed w-25 h-75 overflow-auto shadow-sm d-flex flex-column align-items-center p-2 bg-white rounded">
              <h5>{`${issuesList[0].project.name} Issues`}</h5>
              <button
                type="button"
                className="position-absolute align-self-end btn btn-sm"
                onClick={onHideIssues}
              >
                x
              </button>
              {issuesList.map(elem => (
                <SingleIssue
                  key={elem.id}
                  author={elem.author.name}
                  created={elem.created_on}
                  priority={elem.priority.name}
                  status={elem.status.name}
                  subject={elem.subject}
                  updated={elem.updated_on}
                  projectId={elem.project.id}
                  issueId={elem.id}
                  onTrackOpen={this.onTrackOpen}
                />
              ))}
              <button
                type="button"
                className="btn btn-danger btn-sm mb-2"
                onClick={onHideIssues}
              >
                Close
              </button>
            </div>
          )}
          <div
            className={`fixedWindow trackWindow position-fixed w-25 overflow-hidden shadow-sm ${
              isModalOpened ? "d-flex" : "d-none"
            } flex-column align-items-center p-2 bg-white rounded`}
          >
            <h5>Track</h5>
            <input
              className="w-100 mb-3"
              type="number"
              placeholder="How long..."
              value={hours}
              onChange={this.onTrackInput}
              name="hours"
            />
            <input
              className="w-100 mb-3"
              type="text"
              placeholder="Comment..."
              value={message}
              onChange={this.onTrackInput}
              name="message"
            />
            <button
              className="btn btn-primary w-75 align-self-center mb-3"
              type="button"
              onClick={this.onTrackSubmit}
            >
              Submit
            </button>
            <button
              className="btn btn-danger w-75 align-self-center"
              type="button"
              onClick={this.onModalClose}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.projectsReducer.isLoading,
    isFail: state.projectsReducer.isFail,
    isSuccess: state.projectsReducer.isSuccess,
    projectsList: state.projectsReducer.projectsList,
    projectComments: state.projectsReducer.projectComments,
    trackingProjectId: state.projectsReducer.trackingProjectId,
    trackingIssueId: state.projectsReducer.trackingIssueId,
    issuesList: state.issuesReducer.issuesList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: projectsList => dispatch(projectsRequest(projectsList)),
    onComment: comment => dispatch(projectComment(comment)),
    onShowIssues: projectsList => dispatch(issuesRequest(projectsList)),
    onHideIssues: () => dispatch(issuesHide()),
    onTrackOpen: (projectId, issueId) =>
      dispatch(projectTrack(projectId, issueId)),
    onProjectTrack: (projectId, hours, comment, issueId) =>
      dispatch(projectTimeTrack(projectId, hours, comment, issueId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsScreen);
