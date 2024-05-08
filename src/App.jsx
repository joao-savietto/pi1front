import { useState } from 'react'

import ErrorPage from './pages/error-page.jsx';
import Contact from './pages/contact.jsx';

import Root from './pages/root.jsx';
import Login from './pages/login.jsx';
import { Outlet } from "react-router-dom";

import ProfessorHome from './pages/prof-home.jsx';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Root />,   
        children: [
          {
            path: "prof",
            element: <ProfessorHome />,
          },
        ],             
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
