import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../components/custom-card';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setSelectedClassroom } from '../services/slices/classroomSlice';
import { useDispatch } from 'react-redux';

import useAxios from '../services/hooks/useAxios';

export default function ClassroomList() {

  const [classrooms, setClassrooms] = useState([]);

  const navigate = useNavigate();
  const dispath = useDispatch();
  const axios = useAxios();

  useEffect(() => {
    if (classrooms.length > 0) {
      return
    }
    axios.get('/api/classrooms').then(res => {
      if (res.status === 200) {
        if (res.data?.length > 0) {
          setClassrooms(res.data);
          console.log(res.data);
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
    <div className='d-flex flex-column'>
      <p className='fs-4 fw-medium'>Suas salas de aula</p>
      {classrooms.map(classroom => (
        <CustomCard
          key={classroom.id}
          text={classroom.name}
          subtext={""}
          buttonClick={() => { 
            dispath(setSelectedClassroom(classroom));
            navigate('students')
          }}
          buttonTitle={"Acessar"}
          />
      ))}

    </div>
  );
};
