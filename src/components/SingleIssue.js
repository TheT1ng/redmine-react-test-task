import React from "react";

const SingleIssue = ({
  author,
  created,
  priority,
  status,
  subject,
  updated,
  orderNum
}) => (
  <div className="w-75 pt-2 mb-3 border-top border-bottom border-secondary">
    <p className="text-right">{orderNum}</p>
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
    <button className="btn btn-success btn-lg mb-3 w-100" type="button">
      Track time
    </button>
  </div>
);

export default SingleIssue;
