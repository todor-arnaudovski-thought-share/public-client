import { User } from "./User";

export interface Post {
  pubId: string;
  createdAt: string;
  content: string;
  createdBy: User;
  upvotedBy: User[];
}

export enum VoteActions {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
}
