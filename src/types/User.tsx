import { Post } from "./Post";

export interface User {
  pubId: string | null;
  username: string | null;
  upvotedPosts?: Post[];
}

export interface UserAuthData {
  username: string;
  password: string;
}
