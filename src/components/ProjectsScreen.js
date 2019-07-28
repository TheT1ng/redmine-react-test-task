import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SingleProject from "./SingleProject";
import {
  projectsRequest,
  projectComment,
  projectTimeTrack
} from "../actionCreators/projectsActionCreators";
import { issuesRequest } from "../actionCreators/issuesActionCreators";
import { issuesHide } from "../actions/issuesActions";

class ProjectsScreen extends React.Component {
  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
    // trackProjectTime(378)
    //   .then(resp => resp.json())
    //   .then(suc => console.log(suc));
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
    onShowIssues(projectId);
  };

  render() {
    const {
      projectsList,
      isLoading,
      projectComments,
      issuesList,
      onHideIssues,
      onProjectTrack
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
                onProjectTrack={onProjectTrack}
                onHideIssues={onHideIssues}
                issuesList={issuesList}
                comments={projectComments.map(comment => {
                  if (comment.projectId === elem.id) {
                    return comment.message;
                  }
                  return null;
                })}
              />
            ))
          )}
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
    issuesList: state.issuesReducer.issuesList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: projectsList => dispatch(projectsRequest(projectsList)),
    onComment: comment => dispatch(projectComment(comment)),
    onShowIssues: projectsList => dispatch(issuesRequest(projectsList)),
    onHideIssues: () => dispatch(issuesHide()),
    onProjectTrack: (projectId, hours, comment) =>
      dispatch(projectTimeTrack(projectId, hours, comment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsScreen);
