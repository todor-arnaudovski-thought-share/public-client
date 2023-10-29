import { useState } from "react";
import { AuthService } from "../../../services";
import { useUser } from "../../../store/UserContext";
import { UserAuthData } from "../../../types/User";
import {
  ErrorMessageForProperty,
  InputErrors,
  errorsArrayToRecord,
} from "../../../utils";

export const Register = () => {
  const [inputs, set_inputs] = useState<UserAuthData>({
    username: "",
    password: "",
  });
  const [inputErrors, set_inputErrors] = useState<InputErrors | null>(null);
  const [submitError, set_submitError] = useState<string | null>(null);
  const { setUser } = useUser();

  const onInputsChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    set_submitError(null);
    set_inputErrors((prevState) => {
      return { ...prevState, [name]: null };
    });

    set_inputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await AuthService.register(inputs);
      if (user) {
        setUser(user);
      }
    } catch (err) {
      if (typeof err === "object") {
        set_inputErrors(errorsArrayToRecord(err as ErrorMessageForProperty[]));
      } else {
        set_submitError(err as string);
      }
    }
  };

  return (
    <>
      <h2>Register</h2>
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
          {inputErrors?.username && (
            <span className="block text-red-500 mb-5">
              {inputErrors.username}
            </span>
          )}
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
          {inputErrors?.password && (
            <span className="block text-red-500 mb-5">
              {inputErrors.password}
            </span>
          )}
        </div>
        {submitError && (
          <span className="block text-red-500 mb-5">{submitError}</span>
        )}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </>
  );
};
