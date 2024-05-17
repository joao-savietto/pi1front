import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import useAxios from '../services/hooks/useAxios';

export default function StudentForm({ edit }) {
    const selectedStudent = useSelector((state) => state.student);
    const selectedOccurrence = useSelector((state) => state.occurrence);
    const [availableClassrooms, setAvailableClassrooms] = useState(undefined);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const axios = useAxios();

    useEffect(() => {
        if (!selectedStudent || availableClassrooms !== undefined) {
            return;
        }
        axios.get('/api/classrooms/')
            .then((res) => {
                setAvailableClassrooms(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [axios, selectedStudent, availableClassrooms]);

    function handleSubmit(e) {
        e.preventDefault();
        var data = {
            nome: e.target[0].value,
            email: e.target[1].value,
            is_professor: false,
            is_responsavel: false,
            is_aluno: true,
            password: 'usuario@123'
        };
        if (edit === false) {
            axios.get('/api/users', { params: { email: e.target[2].value } }).then((responsavel) => {
                if (responsavel.data.length === 0) {
                    alert('Nenhum Responsável com esse e-mail foi encontrado');
                } else {
                    const parent = responsavel.data[0];
                    data['responsavel'] = parent.id;
                    axios.post('/api/users/', data).then((u) => {
                        axios.get(`/api/classrooms/${e.target[3].value}`).then((classroom) => {
                            const cl = classroom.data;
                            axios.patch(`/api/classrooms/${e.target[3].value}/`, { members: [...cl.members, u.data.id] })
                                .then(() => {
                                    navigate('/home/admin/students');
                                });
                        });
                    }).catch((err) => {
                        alert('Erro ao cadastrar usuário. Verifique se já existe um usuário com esse e-mail');
                        console.error(err);
                    });
                }
            });
        } else {
            axios.get(`/api/users`, { params: { email: e.target[2].value } }).then((responsavel) => {
                if (responsavel.data.length === 0) {
                    alert('Nenhum Responsável com esse e-mail foi encontrado');
                } else {
                    const parent = responsavel.data[0];
                    data['responsavel'] = parent.id;
                    axios.patch(`/api/users/${selectedStudent.value.id}/`, data).then((u) => {
                        axios.get(`/api/classrooms/${e.target[3].value}`).then((classroom) => {
                            const cl = classroom.data;
                            axios.patch(`/api/classrooms/${e.target[3].value}/`, { members: [...cl.members, u.data.id] })
                                .then(() => {
                                    navigate('/home/admin/students');
                                });
                        });

                    }).catch((err) => {
                        alert('Erro ao cadastrar usuário. Verifique se já existe um usuário com esse e-mail');
                        console.error(err);
                    });
                }
            });
        }
    }

    if (!availableClassrooms) {
        return <p>aguarde...</p>;
    }

    return (
        <div className='d-flex flex-column'>
            <p className='fs-4 fw-medium'>
                {edit === true ? `Formulário de Ocorrência para: ${selectedStudent?.value.nome}` : "Cadastrar aluno"}
            </p>
            <Form className='w-50 ms-3 me-3 pt-5 pb-5 ps-3 pe-3 rounded-4' onSubmit={handleSubmit}>
                <Form.Group controlId="formStudentName">
                    <Form.Label>Nome do aluno</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Fulano da Silva"
                        defaultValue={edit === true ? selectedStudent?.value.nome : ""}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formStudentEmail">
                    <Form.Label>E-mail do aluno</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="fulano@email.com"
                        defaultValue={edit === true ? selectedStudent?.value.email : ""}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formParentEmail">
                    <Form.Label>E-mail do responsável</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="responsavel@email.com"
                        defaultValue={edit === true ? selectedStudent?.value.responsavel?.email : ""}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="selectClassroom">
                    <Form.Label>Sala de aula</Form.Label>
                    <Form.Select
                        aria-label="Select"
                        defaultValue={edit === true ? String(selectedStudent?.value.classroom[0].id) : ""}
                    >
                        {availableClassrooms.map(classroom => (
                            <option key={classroom.id} value={String(classroom.id)}>{classroom.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {edit === true && (
                    <Button className='float-sm-end mt-3' variant="danger" type="submit">
                        Excluir
                    </Button>
                )}
                <Button className='float-sm-end mt-3 me-2' variant="primary" type="submit">
                    Salvar
                </Button>
            </Form>
        </div>
    );
};
