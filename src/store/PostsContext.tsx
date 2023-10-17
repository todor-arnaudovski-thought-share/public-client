import { ReactNode, createContext, useContext, useState } from "react";
import { Post } from "../types/Post";
import { User } from "../types/User";
import { useUser } from "./UserContext";

interface PostsContextDefault {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  updateUpvotedPost: (post: Post) => void;
  updateDownvotedPost: (post: Post) => void;
  addPost: (post: Post) => void;
}

const postsContextDefault: PostsContextDefault = {
  posts: [],
  setPosts: () => {},
  updateUpvotedPost: () => {},
  updateDownvotedPost: () => {},
  addPost: () => {},
};

const PostsContext = createContext(postsContextDefault);

export function usePosts() {
  return useContext(PostsContext);
}

// Provider
interface PostsProviderProps {
  children: ReactNode;
}

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, set_posts] = useState<Post[]>([]);
  const { user } = useUser();

  const setPostsHandler = (postsToSet: Post[]) => {
    if (postsToSet) set_posts(postsToSet);
  };

  const updateUpvotedPostHandler = (upvotedPost: Post) => {
    set_posts((prevState) => {
      const updatedPosts = prevState.map((postItem) => {
        if (postItem.pubId !== upvotedPost.pubId) return postItem;

        const upvotedByEntry: User = {
          pubId: user?.pubId ?? null,
          username: user?.username ?? null,
        };

        const updatedPostItem: Post = {
          ...postItem,
          upvotedBy: postItem?.upvotedBy
            ? [...postItem.upvotedBy, upvotedByEntry]
            : [upvotedByEntry],
        };

        return updatedPostItem;
      });

      return updatedPosts;
    });
  };

  const updateDownvotedPostHandler = (downvotedPost: Post) => {
    set_posts((prevState) => {
      const updatedPosts = prevState.map((postItem) => {
        if (postItem.pubId !== downvotedPost.pubId) return postItem;

        const updatedPostItem: Post = {
          ...postItem,
          upvotedBy: postItem?.upvotedBy
            ? postItem.upvotedBy.filter(
                (userItem) => userItem.pubId !== user?.pubId
              )
            : [],
        };

        return updatedPostItem;
      });

      return updatedPosts;
    });
  };

  const addPostHandler = (post: Post) => {
    set_posts((prevState) => [post, ...prevState]);
  };

  const value = {
    posts,
    setPosts: setPostsHandler,
    updateUpvotedPost: updateUpvotedPostHandler,
    updateDownvotedPost: updateDownvotedPostHandler,
    addPost: addPostHandler,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}
