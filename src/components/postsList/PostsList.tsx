import { useEffect } from "react";
import { getFormattedDate } from "../../utils/dates";
import { Post, VoteActions } from "../../types/Post";
import { useUser } from "../../store/UserContext";
import { usePosts } from "../../store/PostsContext";
import { PostsService } from "../../services";

export const PostsList = () => {
  const { user, addUpvotedPostToUser, removeUpvotedPostFromUser } = useUser();
  const { posts, setPosts, updateUpvotedPost, updateDownvotedPost } =
    usePosts();

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      const fetchedPosts = await PostsService.fetchPosts();
      if (fetchedPosts) {
        setPosts(fetchedPosts);
      }
    };

    fetchAndSetPosts();
  }, []);

  const checkIsUpvotedByUser = (post: Post) => {
    return !!user?.upvotedPosts?.filter(
      (postItem) => postItem.pubId === post.pubId
    )?.length;
  };

  const determineVoteAction = (post: Post) => {
    const isUpvotedByUser = checkIsUpvotedByUser(post);

    return isUpvotedByUser ? VoteActions.DOWNVOTE : VoteActions.UPVOTE;
  };

  const voteHandler = async (post: Post) => {
    try {
      const voteAction = determineVoteAction(post);

      if (voteAction === VoteActions.UPVOTE) {
        const upvotedPost = await PostsService.upvotePost(post.pubId);
        if (upvotedPost) {
          updateUpvotedPost(upvotedPost);
          addUpvotedPostToUser(upvotedPost);
        }
      } else if (voteAction === VoteActions.DOWNVOTE) {
        const downvotedPost = await PostsService.downvotePost(post.pubId);
        if (downvotedPost) {
          updateDownvotedPost(downvotedPost);
          removeUpvotedPostFromUser(downvotedPost);
        }
      }
    } catch (err) {
      console.error("Error voting post:", err);
    }
  };

  return (
    <>
      {posts.map((post, i) => {
        const isUpvotedByUser = checkIsUpvotedByUser(post);

        return (
          <div key={i} className="card bg-primary-content shadow-xl mb-5">
            <div className="card-body">
              <h2 className="text-primary">
                {post.createdBy.username}{" "}
                {post.createdBy.pubId === user?.pubId && "(You)"}
              </h2>
              <span className="block text-xs text-gray-500">
                {getFormattedDate(post.createdAt)}
              </span>
              <p>{post.content}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => voteHandler(post)}
                  className={`btn btn-secondary ${
                    !isUpvotedByUser && "btn-outline"
                  }`}
                >
                  <span className="text-xl">
                    {isUpvotedByUser ? "😡" : "😐"}
                  </span>{" "}
                  {post?.upvotedBy?.length ?? 0}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
