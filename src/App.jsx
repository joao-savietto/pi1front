import { useState } from 'react'

import ErrorPage from './pages/error-page.jsx';

import Root from './pages/root.jsx';
import Login from './pages/login.jsx';
import { Outlet } from "react-router-dom";

import ClassroomList from './pages/classroom-list.jsx';
import StudentList from './pages/student-list.jsx';


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
            element: <ClassroomList />,
          },
          {
            path: "prof/students",
            element: <StudentList />,
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
