import React from "react";
import ScrollToTop from "ScrollToTop";
import DefaultRouters from "./Navigation/Routers";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <ScrollToTop>
        <Toaster />
        <DefaultRouters />
      </ScrollToTop>
    </div>
  );
}

// export default App;
// import React from "react";
// import DefaultRouters from "./Navigation/Routers";
// import { Toaster } from "react-hot-toast";

// function App() {
//   return (
//     <>
//       <Toaster />
//       <DefaultRouters />
//     </>
//   );
// }

export default App;
