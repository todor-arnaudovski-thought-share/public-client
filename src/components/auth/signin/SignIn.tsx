import { useState } from "react";
import { UserAuthData } from "../../../types/User";
import { signIn } from "../../../api/authApi";
import { useUser } from "../../../store/UserContext";

export const SignIn = () => {
  const [inputs, set_inputs] = useState<UserAuthData>({
    username: "",
    password: "",
  });
  const { setUser } = useUser();

  const onInputsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    set_inputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await signIn(inputs);
      console.log("", user);
      setUser(user);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <>
      <h2>Sign in</h2>
      <form className="mb-5" onSubmit={onFormSubmitHandler}>
        <div className="mb-5">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className="input input-bordered w-full max-w-xs"
            name="username"
            onChange={onInputsChangeHandler}
            value={inputs.username}
            autoComplete="on"
          />
        </div>
        <div className="mb-5">
          <label className="label">
            <span className="label-text">Pasword</span>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            onChange={onInputsChangeHandler}
            value={inputs.password}
            autoComplete="on"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
        {/* {errors.postContent && (
    <span className="block text-red-500">{errors.postContent}</span>
  )} */}
      </form>
    </>
  );
};
