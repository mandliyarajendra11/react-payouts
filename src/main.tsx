import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { Provider } from "react-redux";
import store from "./reducer/store";
import "./index.css";
import { ThemeProvider } from "./component/stylecomponent/ThemeContext";

const rootElement = document.querySelector('[data-js="root"]');

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
