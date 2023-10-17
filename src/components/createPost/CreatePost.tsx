import { useState } from "react";
import { createPost } from "../../api/postsApi";
import { usePosts } from "../../store/PostsContext";

export const CreatePost = () => {
  const [postContent, set_postContent] = useState("");
  const [errors, set_errors] = useState<{ postContent: string | null }>({
    postContent: null,
  });
  const { addPost } = usePosts();

  const onPostContentChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.currentTarget.value;
    set_postContent(inputValue);
  };

  const validateInputs = () => {
    let errorCount = 0;

    if (!postContent.length) {
      set_errors((prevState) => ({
        ...prevState,
        postContent: "Cannot create empty post!",
      }));
      errorCount++;
    }

    return errorCount;
  };

  const onFormSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorCount = validateInputs();
    if (errorCount > 0) return;

    const data = {
      content: postContent,
    };

    try {
      const createdPost = await createPost(data);
      if (createdPost) {
        addPost(createdPost);
        set_postContent("");
      }
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <>
      <form className="mb-5" onSubmit={onFormSubmitHandler}>
        <div>
          <label className="label">
            <span className="label-text">What do you hate?</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={onPostContentChangeHandler}
            value={postContent}
          />
          <button type="submit" className="btn btn-primary ms-5">
            Post
          </button>
        </div>
        {errors.postContent && (
          <span className="block text-red-500">{errors.postContent}</span>
        )}
      </form>
    </>
  );
};
