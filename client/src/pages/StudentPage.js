import { useState, useEffect, useRef } from 'react';

function StudentPage() {
  const getBackendData = () => {
    fetch('http://localhost:3001/logged', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        console.log(data.dataValues)
      });
  };
  
useEffect(() => {
  getBackendData();
}, []);

const [student,setStudent] = useState();
return (
  <div className='pagina'>  StudentPage    
  <h1 className='textPagina'>
        Bine ai venit,  { student&&student.firstName + ' ' + student.lastName}
      </h1>
  </div>
);
}

export default StudentPage;
