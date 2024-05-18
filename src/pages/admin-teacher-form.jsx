import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import useAxios from '../services/hooks/useAxios';

export default function TeacherForm({ edit = false}) {
    const selectedTeacher = useSelector((state) => state.student);

    const navigate = useNavigate();
    const axios = useAxios();

    useEffect(() => {
        if (!selectedTeacher) {
            return;
        }
        console.log(selectedTeacher)
        console.log("edit?", edit)
    }, [axios, selectedTeacher]);

    function handleSubmit(e) {
        e.preventDefault();
        var data = {
            nome: e.target[0].value,
            email: e.target[1].value,
            is_professor: true,
            is_responsavel: false,
            is_aluno: false,
            password: 'usuario@123'
        };
        if (edit === false) {
            axios.post('/api/users/', data).then((u) => {
                navigate('/home/admin/teachers');
            }).catch((err) => {
                alert('Erro ao cadastrar usuário. Verifique se já existe um usuário com esse e-mail');
                console.error(err);
            });
        } else {
            axios.patch(`/api/users/${selectedTeacher.value.id}/`, data).then((u) => {
                navigate('/home/admin/teachers');
            }).catch((err) => {
                alert('Erro ao atualizar usuário. Verifique se já existe um usuário com esse e-mail');
                console.error(err);
            });
        }
    }

    return (
        <div className='d-flex flex-column'>
            <p className='fs-4 fw-medium'>
                {edit === true ? `Editando cadastro de: ${selectedTeacher?.value.nome}` : "Cadastrar professor"}
            </p>
            <Form className='formSize ms-3 me-3 pt-5 pb-5 ps-3 pe-3 rounded-4' onSubmit={handleSubmit}>
                <Form.Group controlId="formStudentName">
                    <Form.Label>Nome do professor</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Fulano da Silva"
                        defaultValue={edit === true ? selectedTeacher?.value.nome : ""}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formStudentEmail">
                </Form.Group>
                <Form.Group controlId="formParentEmail">
                    <Form.Label>E-mail do professor</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="professor@email.com"
                        defaultValue={edit === true ? selectedTeacher?.value.email : ""}
                        required
                    />
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
