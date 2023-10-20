import App from "./App";
import withUserProvider from "./hocs/withUserProvider";

const AppWithUserProvider = withUserProvider(App);

export default AppWithUserProvider;
