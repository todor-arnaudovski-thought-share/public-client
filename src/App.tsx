import { Navbar } from "./layouts/navbar/Navbar";
import { PostsProvider } from "./store/PostsContext";
import { CreatePost } from "./components/createPost/CreatePost";
import { PostsList } from "./components/postsList/PostsList";
import { Register, Login, Logout } from "./components/auth";
import { useInitUser } from "./hooks/useInitUser";
import { useEffect, useRef } from "react";
import { EmailService } from "./services";

function App() {
  const { isInit } = useInitUser();
  const isInitialRender = useRef(false);
  console.info(`[useInitUser] is init: ${String(isInit)}`);

  useEffect(() => {
    const fetchVerifyEmail = async () => {
      console.log("CALL!");
      const url = new URL(window.location.href);

      const token = url?.searchParams?.get("token");

      if (token) {
        console.log("[Verify Email] verifying email...");
        await EmailService.verifyEmail(token);
        window.location.reload();
      } else {
        console.log("[Verify Email] no verification token found");
      }
    };

    if (!isInitialRender.current) {
      fetchVerifyEmail();
    }

    isInitialRender.current = true; // prevent multiple invocations
  }, []);

  return (
    <>
      <PostsProvider>
        <Navbar />
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-9">
              <CreatePost />
              <PostsList />
            </div>
            <div className="col-span-12 lg:col-span-3">
              <Register />
              <Login />
              <Logout />
            </div>
          </div>
        </div>
      </PostsProvider>
    </>
  );
}

export default App;
