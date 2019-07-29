import React from "react";

const SingleIssue = ({
  author,
  created,
  priority,
  status,
  subject,
  updated,
  onTrackOpen,
  projectId,
  issueId
}) => (
  <div className="w-100 pt-2 mb-3 border-top border-bottom border-secondary d-flex flex-column">
    <p>
      <strong>Author: </strong>
      {author}
    </p>
    <p>
      <strong>Created on: </strong>
      {created}
    </p>
    <p>
      <strong>Priority: </strong>
      {priority}
    </p>
    <p>
      <strong>Status: </strong>
      {status}
    </p>
    <p>
      <strong>Subject: </strong>
      {subject}
    </p>
    <p>
      <strong>Last update: </strong>
      {updated}
    </p>
    <button
      className="btn btn-success btn-lg mb-3 w-75 align-self-center"
      type="button"
      onClick={() => onTrackOpen(projectId, issueId)}
    >
      Track time
    </button>
  </div>
);

export default SingleIssue;
