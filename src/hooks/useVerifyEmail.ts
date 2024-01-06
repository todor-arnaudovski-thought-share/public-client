import { useEffect, useState } from "react";
import { useUser } from "../store/UserContext";
import { AuthService } from "../services";

export function useVerifyEmail() {
  const [isInit, set_isInit] = useState(false);
  const { setUser } = useUser();

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const verifiedUser = await AuthService.verifyUser();
        if (verifiedUser) {
          setUser(verifiedUser);
          set_isInit(true);
        }
      } catch (err) {
        console.error((err as Error).message);
      }
    };

    fetchAndSetUser();
  }, []);

  return { isInit };
}
