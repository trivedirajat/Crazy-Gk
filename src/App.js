import React from "react";
import ScrollToTop from "ScrollToTop";
import Routers from "./Navigation/Routers";
import DefaultRouters from "./Navigation/Routers";

function App() {
  return (
    <div>
      <ScrollToTop>
        <DefaultRouters />
      </ScrollToTop>
    </div>
  );
}

export default App;
