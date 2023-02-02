import { BrowserRouter } from "react-router-dom";
import Router from "./pages/Router";

import "./App.css";
import { CurrentResponsiveContextProvider } from "./contexts/responsiveContext";
import { CurrentUserContextProvider } from "./contexts/userContext";

function App() {
  return (
    <BrowserRouter>
      <CurrentUserContextProvider>
        <CurrentResponsiveContextProvider>
          <Router />
        </CurrentResponsiveContextProvider>
      </CurrentUserContextProvider>
    </BrowserRouter>
  );
}

export default App;
