import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import useAxios from '../services/hooks/useAxios';
import { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';

export default function ClassroomForm({ edit }) {

    const selectedClassroom = useSelector((state) => state.selectedClassroom);
    const [teachers, setTeachers] = useState(undefined);
    const [selectedTeachers, setSelectedTeachers] = useState([]);

    const navigate = useNavigate();
    const dispath = useDispatch();
    const axios = useAxios();

    useEffect(() => {
        console.log("teachers =", teachers)
        console.log("classroom", selectedClassroom)
        console.log("selected teachers", selectedTeachers)
        if (teachers !== undefined) {
            return;
        }
        axios.get(`/api/users/teachers`)
        .then(res => {
            if (res.status === 200) {
                if (res.data) {
                    setTeachers(res.data);
                    //console.log(res.data);
                }
                else {
                    console.log('No data');
                }
            }
        }).catch(err => {
            console.log('Error');
        })

        if (edit === true) {
            setSelectedTeachers(selectedClassroom?.value.teachers.map(x => x.id))
        } 
    }, [axios, teachers]);

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            name: e.target[0].value,
            members: selectedTeachers
        }

        console.log("data", data);
        if (edit) {
            console.log(data)
            axios.patch(`/api/classrooms/${selectedClassroom?.value.id}/`, data)
                .then(res => {
                    console.log(res)
                    navigate('/home/admin/classrooms')
                }).catch(err => console.log(err))
        } else {
            axios.post('/api/classrooms/', data)
                .then(res => {
                    console.log(res)
                    navigate('/home/admin/classrooms')
                }).catch(err => console.log(err))
        }
    }

    return (
        <div className='d-flex flex-column'>
            <p className='fs-4 fw-medium'>Nova sala de aula</p>
            <Form className='w-50  ms-3 me-3 pt-5 pb-5 ps-3 pe-3 rounded-4' onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nome da sala</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome da sala (Ex. Primeiro ano Manhã)"
                        defaultValue={edit === true ? selectedClassroom?.value.name : ""}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="selectedTeachers">
                    <Form.Label className='mt-3 mb-3' >Professores da sala:</Form.Label>
                    <Container fluid>
                        <Row>
                            {teachers?.map((teacher) => {
                                return (
                                    <Col xs={12} sm={4} md={4} lg={3} xl={3} key={teacher?.id} >
                                        <Form.Check
                                            label={teacher?.nome}
                                            name="group1"
                                            type='checkbox'
                                            id={teacher?.id}
                                            
                                            checked={edit === true ? selectedTeachers?.includes(teacher.id) : false}
                                            onChange={(e) => {
                                                console.log("Selected")
                                                if (!selectedTeachers.includes(teacher?.id)) {
                                                    setSelectedTeachers([...selectedTeachers, teacher?.id])
                                                } else {
                                                    const newSelected = selectedTeachers.filter((item) => item !== teacher?.id);
                                                    setSelectedTeachers(newSelected);
                                                }
                                            }}
                                        />
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container>


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
