import { useState } from "react";
import { UserAuthData } from "../../../types/User";
import { login } from "../../../api/authApi";
import { useUser } from "../../../store/UserContext";

export const Login = () => {
  const [inputs, set_inputs] = useState<UserAuthData>({
    username: "",
    password: "",
  });
  const [error, set_error] = useState<string | null>(null);
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
      const user = await login(inputs);
      if (user) {
        setUser(user);
      }
    } catch (err) {
      set_error((err as Error).message);
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
        {error && <span className="block text-red-500 mb-5">{error}</span>}
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </>
  );
};