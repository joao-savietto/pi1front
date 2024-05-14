import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from'react';
import useAxios from '../services/hooks/useAxios';
import { useDispatch } from 'react-redux';
import { setSelectedStudent } from '../services/slices/studentSlice';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function StudentList() {
  const selectedClassroom = useSelector(state => state.selectedClassroom);
  const [classroom, setClassroom] = useState(undefined);
  const axios = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (classroom !== undefined){
      return
    }
    axios.get(`/api/classrooms/${selectedClassroom?.value.id}`)
      .then(res => {
      if (res.status === 200) {
        if (res.data) {
          setClassroom(res.data);
          console.log(res.data);
        }
        else {
          console.log('No data');
        }
      }
    }).catch(err => {
      console.log('Error');
    })
  }, [selectedClassroom]);

  return (
    <div className='d-flex flex-column'>
      <p className='fs-4 fw-medium'>Alunos da sala</p>
      {classroom?.students && (
        <Table hover bordered responsive="md" striped className=' w-75 mx-auto'>
          <thead>
            <tr>
              <th className='text-center'>Número</th>
              <th className='text-center'>Nome</th>
              <th className='text-center'>Ocorrências</th>
              <th></th>
            </tr>
          </thead>
          {classroom.students.slice().sort((a, b) => {
            return a.nome > b.nome ? 1 : -1;
          }).map((student, index) => (
            <tbody key={index}>
              <tr>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{student.nome}</td>
                <td className='text-center'>{student.occurrence_count}</td>
                <td className=' w-50 text-center '>
                  <Button 
                    onClick={() => {
                      dispatch(setSelectedStudent(student)); 
                      navigate('occurrences')
                    }}
                    variant='outline-primary'
                    disabled={student.occurrence_count === 0}
                    className=' ms-4 me-2'>
                      Detalhes
                  </Button>
                  <Button 
                    onClick={() => {
                      dispatch(setSelectedStudent(student));      
                      navigate('occurrences/new')                
                    }}                  
                    className=''
                      >Nova ocorrência
                  </Button>
                </td>

              </tr>
            </tbody>
          ))}
        </Table>
      )}

    </div>
  );
};
