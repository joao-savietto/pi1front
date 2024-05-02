import { Outlet, Link } from "react-router-dom";
import books from "../assets/books.jpg"


export default function Root() {
    return (
      <div className="d-flex flex-row w-100 h-100">
        <div
        className=" d-flex flex-column bg-primary align-items-center h-100"
        style={{ width: "222px" }}
        >
          <img src={books} alt="Book Cover" />
          <div className="d-flex flex-column align-baseline w-100 ms-5">
            <p className="text-white fs-6 fw-bold mb-2">Teste 1</p>
            <p className="text-white fs-6 fw-bold mb-2">Teste 2</p>
          </div>
        </div>        
        <div className="w-100">
          <div 
            className="d-flex flex-column align-content-center w-100 bg-dark-subtle mb-2 bottom-shaddow "
            style={{ maxHeight: "80px"}}
          >
            <p class="fs-5 mb-1 ms-3 mt-2" >Sistema de Controle de Ocorrências</p>
            <p class="fs-7 fw-light ms-3 pb-2">Módulo do professor</p>
          </div>
          <div className=" position-relative w-auto ms-3">            
            <p>Teste</p>
            <Outlet />
          </div>
        </div>
      </div>
    );
  }