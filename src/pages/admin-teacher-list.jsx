import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import useAxios from '../services/hooks/useAxios';
import { setSelectedUser } from '../services/slices/userSlice';

export default function AdminTeacherList() {
  const [teachers, setTeachers] = useState(undefined);
  const axios = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    console.log(filteredTeachers)
    console.log(teachers)
    if (teachers !== undefined) {
      return;
    }
    axios.get('/api/users/teachers')
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data)
            setTeachers(res.data);
            setFilteredTeachers(res.data);
          } else {
            console.log('No data');
          }
        }
      })
      .catch((err) => {
        console.log('Error');
      });
  }, [teachers]);

  useEffect(() => {
    const filtered = teachers?.filter((student) =>
      student.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [searchTerm, teachers]);

  return (
    <div className="d-flex flex-column">
      <div className='d-flex justify-content-between align-items-center '>
        <p className="fs-4 fw-medium">Gerenciar professores</p>
        <Button
          className=' float-end w-auto h-auto'
          onClick={() => {
            navigate('new');
          }}
        >
          Adicionar professor
        </Button>
      </div>

      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Procurar por nome do professor"
        className="form-control w-50 text-center align-self-center mb-4 my-3"
      />
      {filteredTeachers?.length > 0 ? (

        <Table hover bordered responsive="md" striped className="w-75 mx-auto">

          <thead>
            <tr>
              <th className="text-center">Nome</th>
              <th className="text-center">Salas de aula</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          {filteredTeachers.map((teacher, index) => (
            <tbody key={index}>
              <tr>
              <td className="text-center">{teacher.nome}</td>
                <td className="text-center">{(teacher?.classroom || []).length}</td>
                <td className="col-2 text-center">
                  <Button
                    onClick={() => {
                      dispatch(setSelectedUser(teacher));
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
          Nenhum responsável
        </p>
      )}
    </div>
  );
};
