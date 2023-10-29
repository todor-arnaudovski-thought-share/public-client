import { useState } from "react";
import { PostsService } from "../../services";
import { usePosts } from "../../store/PostsContext";
import {
  ErrorMessageForProperty,
  InputErrors,
  errorsArrayToRecord,
} from "../../utils";

export const CreatePost = () => {
  const [postContent, set_postContent] = useState("");
  const [inputErrors, set_inputErrors] = useState<InputErrors | null>(null);
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
      set_inputErrors((prevState) => ({
        ...prevState,
        content: "Cannot create an empty post",
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
      const createdPost = await PostsService.createPost(data);
      if (createdPost) {
        addPost(createdPost);
        set_postContent("");
      }
    } catch (err) {
      if (typeof err === "object") {
        set_inputErrors(errorsArrayToRecord(err as ErrorMessageForProperty[]));
      }
      console.error((err as Error).message);
    }
  };

  return (
    <>
      <form className="mb-5" onSubmit={onFormSubmitHandler}>
        <div>
          <label className="label">
            <span className="label-text">What's on your mind?</span>
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
        {inputErrors?.content && (
          <span className="block text-red-500">{inputErrors.content}</span>
        )}
      </form>
    </>
  );
};
