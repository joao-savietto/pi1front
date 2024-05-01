import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar" className=" bg-primary h-100 w-75 ">
          <h1>React Router aaaa</h1>

        </div>
        <div id="detail">
          <Outlet />
        </div>
      </>
    );
  }