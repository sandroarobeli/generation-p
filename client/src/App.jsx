import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme/theme";

// !!! sitemap.xml !!!
// AUTHOR'S IDEAS => MY EXECUTION

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      Get laid!
    </ThemeProvider>
  );
};

export default App;
