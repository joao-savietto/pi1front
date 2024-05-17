import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import useAxios from '../services/hooks/useAxios';

export default function ParentForm({ edit }) {
    const selectedParent = useSelector((state) => state.student);

    const navigate = useNavigate();
    const axios = useAxios();

    useEffect(() => {
        if (!selectedParent) {
            return;
        }
        console.log(selectedParent)
    }, [axios, selectedParent]);

    function handleSubmit(e) {
        e.preventDefault();
        var data = {
            nome: e.target[0].value,
            email: e.target[1].value,
            is_professor: false,
            is_responsavel: true,
            is_aluno: false,
            password: 'usuario@123'
        };
        if (edit === false) {
            axios.post('/api/users/', data).then((u) => {
                navigate('/home/admin/parents');
            }).catch((err) => {
                alert('Erro ao cadastrar usuário. Verifique se já existe um usuário com esse e-mail');
                console.error(err);
            });
        } else {
            axios.patch(`/api/users/${selectedParent.value.id}/`, data).then((u) => {
                navigate('/home/admin/parents');
            }).catch((err) => {
                alert('Erro ao atualizar usuário. Verifique se já existe um usuário com esse e-mail');
                console.error(err);
            });
        }
    }

    return (
        <div className='d-flex flex-column'>
            <p className='fs-4 fw-medium'>
                {edit === true ? `Formulário de Ocorrência para: ${selectedParent?.value.nome}` : "Cadastrar aluno"}
            </p>
            <Form className='w-50 ms-3 me-3 pt-5 pb-5 ps-3 pe-3 rounded-4' onSubmit={handleSubmit}>
                <Form.Group controlId="formStudentName">
                    <Form.Label>Nome do responsável</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Fulano da Silva"
                        defaultValue={edit === true ? selectedParent?.value.nome : ""}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formStudentEmail">
                </Form.Group>
                <Form.Group controlId="formParentEmail">
                    <Form.Label>E-mail do responsável</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="responsavel@email.com"
                        defaultValue={edit === true ? selectedParent?.value.email : ""}
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
