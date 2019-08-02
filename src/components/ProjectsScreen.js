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
import TimeTrackModal from "./TimeTrackModal";

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

  onCommentLeave = (projectId, message, e) => {
    e.preventDefault();
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

  onTrackSubmit = e => {
    e.preventDefault();
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
    if (sessionStorage.getItem("isUserLogged")) {
      return (
        <div className="projectsContainer pt-4 min-vh-100">
          <h3 className="font-weight-bold text-uppercase text-center">
            list of all projects
          </h3>
          {isLoading ? (
            <div className="spinner-border text-primary d-block mx-auto mt-4" />
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
          <TimeTrackModal
            hours={hours}
            message={message}
            isModalOpened={isModalOpened}
            onModalClose={this.onModalClose}
            onTrackInput={this.onTrackInput}
            onTrackSubmit={this.onTrackSubmit}
          />
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
