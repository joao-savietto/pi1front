import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import useAxios from '../services/hooks/useAxios';
import { setSelectedStudent } from '../services/slices/studentSlice';

export default function AdminStudentList() {
  const [students, setStudents] = useState(undefined);
  const axios = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    console.log(filteredStudents)
    console.log(students)
    if (students !== undefined) {
      return;
    }
    axios.get('/api/users/students')
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data)
            setStudents(res.data);
            setFilteredStudents(res.data);
          } else {
            console.log('No data');
          }
        }
      })
      .catch((err) => {
        console.log('Error');
      });
  }, [students]);

  useEffect(() => {
    const filtered = students?.filter((student) =>
      student.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  return (
    <div className="d-flex flex-column">
      <div className='d-flex justify-content-between align-items-center '>
        <p className="fs-4 fw-medium">Gerenciar alunos</p>
        <Button
          className=' float-end w-auto h-auto'
          onClick={() => {
            navigate('new');
          }}
        >
          Adicionar aluno
        </Button>
      </div>

      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Procurar por nome do aluno"
        className="form-control w-50 text-center align-self-center mb-4 my-3"
      />
      {filteredStudents?.length > 0 ? (

        <Table hover bordered responsive="md" striped className="w-75 mx-auto">

          <thead>
            <tr>
              <th className="text-center">Nome</th>
              <th className="text-center">Classe</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          {filteredStudents.map((student, index) => (
            <tbody key={index}>
              <tr>
                <td className="text-center">{student.nome}</td>
                <td className="text-center">
                  {(student.classroom || []).length > 0
                    ? student.classroom[0].name
                    : ''}
                </td>
                <td className="col-2 text-center">
                  <Button
                    onClick={() => {
                      dispatch(setSelectedStudent(student));
                      navigate('edit');
                    }}
                    variant="primary"
                    className="ms-4 me-2">
                    Editar
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      ) : (
        <p className="fs-5 fw-light text-center">
          Nenhum aluno
        </p>
      )}
    </div>
  );
};
