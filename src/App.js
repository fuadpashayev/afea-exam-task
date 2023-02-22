import { Provider } from "react-redux";
import store from "state";
import Routes from "routes";

import "styles/index.css";

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
