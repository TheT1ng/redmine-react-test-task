import { PROJECT_TRACK } from "../constants/actionTypes";

export const projectTrack = (projectId, issueId) => ({
  type: PROJECT_TRACK,
  ids: {
    projectId,
    issueId
  }
});
