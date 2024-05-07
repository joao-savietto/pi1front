import { Outlet, Link } from "react-router-dom";
import books from "../assets/books.jpg"
import { Mortarboard } from "react-bootstrap-icons";
import { Person } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { setTokens } from "../services/slices/authSlice";
import { useEffect } from "react";

export default function Root() {

    const dispatch = useDispatch();
    // const accessToken = useSelector(state => state.auth.accessToken);
    // const refreshToken = useSelector(state => state.auth.refreshToken);

    // useEffect(() => {
    //   console.log(accessToken, refreshToken)
    // }, [accessToken]);

    return (
      <div className="d-flex flex-row w-100 h-100">
        <div
        className=" d-flex flex-column bg-primary align-items-center h-100"
        style={{ width: "222px" }}
        >
          <img src={books} alt="Book Cover" />
          <div className="d-flex flex-column align-baseline w-100 ms-4">
            <Link to={'/home/prof'} className="text-white fs-6 fw-bold mb-2 text-decoration-none">              
              <Mortarboard className="me-1"/>                            
              Salas de Aula
            </Link>            
          </div>
          <div className="d-flex align-bottom w-100 h-100 flex-column-reverse ms-3">
          <Link to={'/'} className="text-white fs-6 fw-bold mb-2 text-decoration-none">              
              <Person className="me-1"/>                            
              Fulano de Tal
            </Link>
          </div>
        </div>        
        <div className="w-100">
          <div 
            className="d-flex flex-column align-content-center w-100 bg-dark-subtle mb-2 bottom-shaddow "
            style={{ maxHeight: "80px"}}
          >
            <p className="fs-5 mb-1 ms-3 mt-2" >Sistema de Controle de Ocorrências</p>
            <p className="fs-7 fw-light ms-3 pb-2">Módulo do professor</p>
          </div>
          <div className=" position-relative w-auto ms-3">            
            <Outlet />
          </div>
        </div>
      </div>
    );
  }