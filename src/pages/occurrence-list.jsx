import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../components/custom-card';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setSelectedClassroom } from '../services/slices/classroomSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import useAxios from '../services/hooks/useAxios';
import { occurrence_descriptions } from '../services/occurrence-type';
import { convertUTCStringToLocalDate } from '../services/dates';
import { setSelectedOccurrence } from '../services/slices/occurrenceSlice';

export default function OccurrenceList({parentMode}) {

  const [occurrences, setOccurrences] = useState([]);
  const selectedStudent = useSelector((state) => state.student)

  const navigate = useNavigate();
  const dispath = useDispatch();
  const axios = useAxios();

  useEffect(() => {
    console.log(selectedStudent)
    if (occurrences.length > 0 || !selectedStudent) {
      return
    }
    axios.get('/api/occurrences', {params: {'student': selectedStudent.value.id}}).then(res => {
      if (res.status === 200) {
        if (res.data?.length > 0) {
          setOccurrences(res.data);
          console.log(res.data);
        }
        else {
          console.log('No data');
        }
      }
    }).catch(err => {
      console.log('Error');
    })
  }, [axios, occurrences, selectedStudent]);

  console.log("PARENT", parentMode)

  return (
    <div className='d-flex flex-column'>
      <p className='fs-4 fw-medium'>{"Ocorrências de " + selectedStudent.value.nome}</p>
      {occurrences.map(occurrence => (
        <CustomCard
          key={occurrence.id}
          buttonHidden={true}
          text={ occurrence_descriptions[occurrence.occurrence_type]}
          subtext={
            convertUTCStringToLocalDate(occurrence.created_at) + ` - ${parentMode === false ? "" : occurrence.description}`
          }
          buttonClick={() => { 
            dispath(setSelectedOccurrence(occurrence));
            navigate('form')
          }}
          buttonTitle={"Visualizar"}
          />
      ))}

    </div>
  );
};
