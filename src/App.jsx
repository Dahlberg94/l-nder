import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


//Layouts
import RootLayout from "./layouts/RootLayout";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      
    </Route>
  )
)


function App() {
  return <div>
    <RouterProvider router={router} />
  </div>;
}

export default App;
