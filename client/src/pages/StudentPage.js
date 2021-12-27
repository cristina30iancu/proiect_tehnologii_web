import { useState, useEffect, useRef } from 'react';

function StudentPage() {
    const getBackendData = () => {
    fetch('http://localhost:3001/user', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const std = data;
        console.log(std);
      });
  };
  
useEffect(() => {
  getBackendData();
}, []);

return (
  <div className='pagina'>  StudentPage    
  </div>
);
}

export default StudentPage;
