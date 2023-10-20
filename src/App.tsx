import { Navbar } from "./layouts/navbar/Navbar";
import { PostsProvider } from "./store/PostsContext";
import { CreatePost } from "./components/createPost/CreatePost";
import { PostsList } from "./components/postsList/PostsList";
import { Register, Login, Logout } from "./components/auth";
import { useInitUser } from "./hooks/useInitUser";

function App() {
  const { isInit } = useInitUser();
  console.info(`[useInitUser] is init: ${String(isInit)}`);

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
