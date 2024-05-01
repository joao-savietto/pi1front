import { useState } from 'react'

import ErrorPage from './pages/error-page.jsx';
import Contact from './pages/contact.jsx';

import Root from './pages/root.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
