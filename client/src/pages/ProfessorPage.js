import { useState, useEffect } from 'react';

function ProfessorPage() {

  const getBackendData = () => {
    fetch('http://localhost:3001/user/logged', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const prof = data;
      });
  };

  
useEffect(getBackendData, []);

  return (
    <div className='pagina'>  ProfessorPage    
    </div>
  );
  
}

export default ProfessorPage;
