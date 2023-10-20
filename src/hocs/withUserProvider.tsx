import { UserProvider } from "../store/UserContext";

const withUserProvider = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WithUserProvider: React.FC<P> = (props) => {
    return (
      <>
        <UserProvider>
          <Component {...props} />
        </UserProvider>
      </>
    );
  };

  return WithUserProvider;
};

export default withUserProvider;
