import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalStyles from "./GlobalStyles/index.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyles>
      <Provider store={store}>
        <App />
      </Provider>

    </GlobalStyles>
  </StrictMode>
);
