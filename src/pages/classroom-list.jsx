import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../components/custom-card';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setSelectedClassroom } from '../services/slices/classroomSlice';
import { useDispatch } from 'react-redux';

import useAxios from '../services/hooks/useAxios';
import { Button } from 'react-bootstrap';

export default function ClassroomList({ admin }) {

  const [classrooms, setClassrooms] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axios = useAxios();

  useEffect(() => {
    if (classrooms.length > 0) {
      return
    }
    axios.get('/api/classrooms').then(res => {
      if (res.status === 200) {
        if (res.data?.length > 0) {
          setClassrooms(res.data);
        }
        else {
          console.log('No data');
        }
      }
    }).catch(err => {
      console.log('Error');
    })
  }, [axios, classrooms]);



  return (
    <div className="d-flex flex-column">
      <div className='d-flex justify-content-between align-items-center'>
        <p className="fs-4 fw-medium">
          {admin === true ? "Gerenciar salas de aula" : "Suas salas de aula"}
        </p>
        {admin === true && (
          <Button
            onClick={() => {
              navigate('form/new');
            }}
          >
            Adicionar sala
          </Button>
        )}

      </div>

      {classrooms.length > 0 ? (
        classrooms.map((classroom) => (
          <CustomCard
            key={classroom.id}
            text={classroom.name}
            subtext={""}
            buttonClick={() => {
              dispatch(setSelectedClassroom(classroom));
              if(admin === true){
                navigate('form/edit');
              } else {
                navigate('students');
              }
            }}
            buttonTitle={admin === true ? "Gerenciar" : "Acessar"}
          />
        ))
      ) : (
        <p className="fs-5 fw-light text-center">Você não possui salas de aula </p>
      )}
    </div>
  );
};
