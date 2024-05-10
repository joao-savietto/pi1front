import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function StudentList() {
  const selectedClassroom = useSelector(state => state.selectedClassroom);


  useEffect(() => {
    console.log('selectedClassroom', selectedClassroom.value.students);
    // sort students based on key "name"
    const sortedStudents = selectedClassroom.value.students.slice().sort((a, b) => {
      return a.nome > b.nome ? 1 : -1;
    })
  }, [selectedClassroom]);

  return (
    <div className='d-flex flex-column'>
      <p className='fs-4 fw-medium'>Alunos da sala</p>
      {selectedClassroom?.value?.students && (
        <Table bordered responsive="md" striped className=' w-75 mx-auto'>
          <thead>
            <tr>
              <th className='text-center'>Número</th>
              <th className='text-center'>Nome</th>
              <th className='text-center'>Ocorrências</th>
              <th></th>
            </tr>
          </thead>
          {selectedClassroom.value.students.slice().sort((a, b) => {
            return a.nome > b.nome ? 1 : -1;
          }).map((student, index) => (
            <tbody key={index}>
              <tr>
                <td className='text-center'>{index+1}</td>
                <td className='text-center'>{student.nome}</td>
                <td className='text-center'>{student.occurrence_count}</td>
                <td className=' w-25 '>
                  <Link to={'student'} className=' ms-4 btn btn-outline-primary me-2'>Detalhes</Link>
                  <Link to={'student'} className='btn btn-primary'>Nova ocorrência</Link>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      )}

    </div>
  );
};
