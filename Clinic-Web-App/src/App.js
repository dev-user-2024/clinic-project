import './App.css';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { RouterProvider } from "react-router-dom";
import {router} from "./routes"
import MainContext from "./context";
import { useState } from 'react';
import { LightTheme , DarkTheme } from './layout/themes';
import rtlPlugin from 'stylis-plugin-rtl';
import React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [mode, setMode] = useState("light");
  const [tab,setTab] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleToggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Note Create Rtl Cache
const rtlcache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


  return (
    <ThemeProvider theme={LightTheme}>
    <CacheProvider value={rtlcache}>
    <MainContext.Provider 
    value={{
      handleToggleMode,
      mode,
      setDrawerOpen,
      drawerOpen,
      tab,
      setTab
    }}
    >
    <div className="App">
    <RouterProvider router={router} />
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover />
    </div>
    </MainContext.Provider>
    </CacheProvider>
    </ThemeProvider>
  );
}

export default App;
