import { PROJECT_COMMENT } from "../constants/actionTypes";

export const projectComment = comment => ({
  type: PROJECT_COMMENT,
  comment
});
