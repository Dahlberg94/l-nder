import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CountryList, { CountryListLoader } from "./Lands/CountryList";
import CountryDetails, {CountryDetailsLoader} from "./Lands/CountryDetail";


//Layouts
import RootLayout from "./layouts/RootLayout";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
<Route 
    index 
    element={<CountryList />} 
    loader={CountryListLoader} 
    errorElement={<p>Something went wrong while loading countries.</p>} 
/>
          <Route path="/country/:name" element={<CountryDetails />} loader={CountryDetailsLoader} />

    </Route>
  )
)


function App() {
  return <div>
    <RouterProvider router={router} />

  </div>;
}

export default App;
