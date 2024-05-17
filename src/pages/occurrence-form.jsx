import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setSelectedClassroom } from '../services/slices/classroomSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import useAxios from '../services/hooks/useAxios';
import { occurrence_descriptions } from '../services/occurrence-type';

export default function OccurrenceForm({ edit }) {

  const selectedStudent = useSelector((state) => state.student)
  const selectedOccurrence = useSelector((state) => state.occurrence);

  const navigate = useNavigate();
  const dispath = useDispatch();
  const axios = useAxios();

  useEffect(() => {
    console.log(selectedStudent)
    if (!selectedStudent) {
      return
    }
    console.log("ALUNO", selectedStudent)
    console.log("Ocorrencia", selectedOccurrence);

  }, [axios, selectedStudent]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      student: selectedStudent?.value.id,
      description: e.target[0].value,
      occurrence_type: e.target[1].value,
    }
    if (edit) {
      console.log(data)
      axios.patch(`/api/occurrences/${selectedOccurrence?.value.id}/`, data)
        .then(res => {
          console.log(res)
          navigate('/home/prof/students/occurrences')
        }).catch(err => console.log(err))
    } else {
      axios.post('/api/occurrences/', data)
        .then(res => {
          console.log(res)
          navigate('/home/prof/students/occurrences')
        }).catch(err => console.log(err))
    }
  }

  return (
    <div className='d-flex flex-column'>
      <p className='fs-4 fw-medium'>Formulário de Ocorrência para: {selectedStudent?.value.nome}</p>
      <Form className='w-50  ms-3 me-3 pt-5 pb-5 ps-3 pe-3 rounded-4' onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Descrição do ocorrido</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            type="text"
            placeholder="Descrição do ocorrido"
            defaultValue={edit === true ? selectedOccurrence?.value.description : ""}
          />
        </Form.Group>
        <Form.Group controlId="selectOcurrence">
          <Form.Label>Tipo de ocorrência</Form.Label>
          <Form.Select
            aria-label="Select"
            placeholder="Tipo de ocorrência"
            defaultValue={edit === true ? selectedOccurrence?.value.occurrence_type : ""}
          >
            {Object.keys(occurrence_descriptions).map((key) => (
              <option value={key} key={key}>
                {occurrence_descriptions[key]}
              </option>
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
