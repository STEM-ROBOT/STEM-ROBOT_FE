import React from "react";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>

  );
}

export default App;
