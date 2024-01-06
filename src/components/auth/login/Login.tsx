import { useState } from "react";
import { AuthService } from "../../../services";
import { useUser } from "../../../store/UserContext";
import { UserLoginData } from "../../../types";

export const Login = () => {
  const [inputs, set_inputs] = useState<UserLoginData>({
    email: "",
    password: "",
  });
  const [submitError, set_submitError] = useState<string | null>(null);
  const { setUser } = useUser();

  const onInputsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    // reset errors
    set_submitError(null);

    set_inputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await AuthService.login(inputs);
      if (user) {
        setUser(user);
      }
    } catch (err) {
      set_submitError((err as Error).message);
    }
  };

  return (
    <>
      <h2>Sign in</h2>
      <form className="mb-5" onSubmit={onFormSubmitHandler}>
        <div className="mb-5">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Enter email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            onChange={onInputsChangeHandler}
            value={inputs.email}
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
        {submitError && (
          <span className="block text-red-500 mb-5">{submitError}</span>
        )}
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </>
  );
};
