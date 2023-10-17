import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/User";
import { Post } from "../types/Post";
import { verifyUser } from "../api/authApi";

interface UserContextDefault {
  user: User | null;
  setUser: (user: User) => void;
  addUpvotedPostToUser: (post: Post) => void;
  removeUpvotedPostFromUser: (post: Post) => void;
}

const userContextDefault: UserContextDefault = {
  user: null,
  setUser: () => {},
  addUpvotedPostToUser: () => {},
  removeUpvotedPostFromUser: () => {},
};

const UserContext = createContext(userContextDefault);

export function useUser() {
  return useContext(UserContext);
}

// Provider
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, set_user] = useState<User>({
    pubId: null,
    username: null,
    upvotedPosts: [],
  });

  useEffect(() => {
    const fetchAndSetUser = async () => {
      const fetchedUser = await verifyUser();
      if (fetchedUser) {
        set_user(fetchedUser);
      }
    };

    fetchAndSetUser();
  }, []);

  const addUpvotedPostToUserHandler = (post: Post) => {
    set_user((prevState) => ({
      ...prevState,
      upvotedPosts: [...(prevState.upvotedPosts || []), post],
    }));
  };

  const removeUpvotedPostFromUserHandler = (post: Post) => {
    set_user((prevState) => ({
      ...prevState,
      upvotedPosts: [
        ...(prevState.upvotedPosts?.filter(
          (item) => item.pubId !== post.pubId
        ) ?? []),
      ],
    }));
  };

  const value = {
    user,
    setUser: set_user,
    addUpvotedPostToUser: addUpvotedPostToUserHandler,
    removeUpvotedPostFromUser: removeUpvotedPostFromUserHandler,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
