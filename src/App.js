import React from "react";
import ScrollToTop from "ScrollToTop";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import Routers from "./Navigation/Router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { baselightTheme } from "theme/DefaultColors";

function App() {
  const routing = useRoutes(Routers);

  return (
    <ThemeProvider theme={baselightTheme}>
      <ScrollToTop>
        <Toaster />
        <CssBaseline />
        {routing}
      </ScrollToTop>
    </ThemeProvider>
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
