import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import PrivateRouteAdmin from './components/PrivateRouteAdmin';

// import HomeAdmin from './components/Admin/UserTableAdmin.jsx';
import Home from './screens/Admin/Home.jsx';
import LoginAdmin from "./screens/LoginAdmin.jsx";
import Devices from './screens/Admin/Devices.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

    <Route path="/" element={<App/>}>
    <Route path="/admin/login" element={<LoginAdmin />} />
      <Route path="" element={<PrivateRouteAdmin />}>
      <Route path="/admin/user" element={<Home/>} />
      <Route path="/admin/device" element={<Devices/>} />
      </Route>
    </Route>
  </>
   
  )

)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);