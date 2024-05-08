import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../components/custom-card';
import { Link } from'react-router-dom';

import useAxios from '../services/hooks/useAxios';

export default function ProfessorHome() {
  const navigate = useNavigate();
  const axios = useAxios();
  
  return (
    <div className='d-flex flex-column'>
      <p className='fs-4 fw-medium'>Suas salas de aula</p>
      <CustomCard
        text="Welcome to My Store"
        subtext="Discover the latest products and offers."
        buttonTitle={'Go to My Store'}
      />
      <CustomCard
        text="Shop Now"
        subtext=""
        buttonClick={() => alert("Button clicked")}
        buttonTitle="Add to Cart"
      />      
    </div>
  );
};
