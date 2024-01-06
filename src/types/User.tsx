import { Post } from "./Post";

export interface User {
  pubId: string | null;
  username: string | null;
  upvotedPosts?: Post[];
}

export interface UserRegisterData {
  email: string;
  username: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}
