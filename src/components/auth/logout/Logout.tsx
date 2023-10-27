import { useState } from "react";
import { AuthService } from "../../../services";

export const Logout = () => {
  const [error, set_error] = useState<string | null>(null);

  const logoutHandler = async () => {
    try {
      await AuthService.logout();
      window.location.reload();
    } catch (err) {
      set_error((err as Error).message);
    }
  };

  return (
    <>
      {error && <span className="block text-red-500 mb-5">{error}</span>}
      <button className="btn btn-primary" onClick={logoutHandler}>
        Logout
      </button>
    </>
  );
};
