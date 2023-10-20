import { useEffect, useState } from "react";
import { useUser } from "../store/UserContext";
import { verifyUser } from "../api/authApi";

export function useInitUser() {
  const [isInit, set_isInit] = useState(false);
  const { setUser } = useUser();

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const verifiedUser = await verifyUser();
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
