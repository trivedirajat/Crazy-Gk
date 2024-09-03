import React from "react";
import ScrollToTop from "ScrollToTop";
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
