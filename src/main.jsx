import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FormProvider } from "./context/FormContext.jsx";

createRoot(document.getElementById("root")).render(
  <FormProvider>
    <App />
  </FormProvider>
);
