import { Navbar } from "./layouts/navbar/Navbar";
import { UserProvider } from "./store/UserContext";
import { CreatePost } from "./components/createPost/CreatePost";
import { PostsList } from "./components/postsList/PostsList";
import { PostsProvider } from "./store/PostsContext";
import { Register, Login, Logout } from "./components/auth";

function App() {
  return (
    <>
      <UserProvider>
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
      </UserProvider>
    </>
  );
}

export default App;
