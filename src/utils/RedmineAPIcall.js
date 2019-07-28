const url = "https://redmine.ekreative.com";

// "X-Redmine-API-Key": "2fda745bb4cdd835fdf41ec1fab82a13ddc1a54c"

export function getIssues(name, password, limit) {
  // Limiting to 1 if no limit is set, since we dont need them, just to authenticate user
  return fetch(`${url}/issues.json?&limit=${limit || 1}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${name}:${password}`)}`
    }
  });
}

export function getProjects() {
  return fetch(`${url}/projects.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Those method can't be called before user logs in, so no need to validate once more
      Authorization: `Basic ${btoa("test:testtask")}`
    }
  });
}

export function getIssuesPerProject(limit, projectId) {
  return fetch(
    `${url}/issues.json?&limit=${limit || 100}&project_id=${projectId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("test:testtask")}`
      }
    }
  );
}

export function trackProjectTime(projectId, hours, comment, issueId) {
  return fetch(`${url}/time_entries.json`, {
    method: "POST",
    body: JSON.stringify({
      time_entry: {
        project_id: projectId,
        issue_id: issueId,
        hours: hours || 1,
        comments: comment
      }
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa("test:testtask")}`
    }
  });
}
