import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../components/custom-card';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedStudent } from '../services/slices/studentSlice';

import useAxios from '../services/hooks/useAxios';

export default function ParentChildrenList() {

  const [children, setChildren] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axios = useAxios();

  useEffect(() => {
    if (children.length > 0) {
      return
    }
    axios.get('/api/users/children').then(res => {
      if (res.status === 200) {
        if (res.data?.length > 0) {
          setChildren(res.data);
          console.log(res.data);
        }
        else {
          console.log('No data');
        }
      }
    }).catch(err => {
      console.log('Error');
    })
  }, [axios, children]);



  return (
    <div className="d-flex flex-column">
      <p className="fs-4 fw-medium">Filhos(as)</p>
      {children.length > 0 ? (
        children.map((c) => (
          <CustomCard
            key={c.id}
            text={c.nome}
            subtext={``}       
            buttonClick={() => {
              dispatch(setSelectedStudent(c));
              navigate('occurrences');
            }}
            buttonTitle={"Acessar"}
          />
        ))
      ) : (
        <p className="fs-5 fw-light text-center">Você não possui salas de aula </p>
      )}
    </div>
  );
};
