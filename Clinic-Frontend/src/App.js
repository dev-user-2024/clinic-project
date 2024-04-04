import './App.css';
import { RouterProvider } from "react-router-dom";
import {router} from "./routes"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import MainContext from "./context";
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  return (
    <div className="App">
    <MainContext.Provider
    value={{
      token,
      setToken
    }}
    >
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
    </MainContext.Provider>
    </div>
  );
}

export default App;
