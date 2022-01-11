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
        setStudent(data.dataValues);
        console.log(data.dataValues)
      });
  };
  
useEffect(() => {
  getBackendData();
}, []);

const [student,setStudent] = useState();
return (
  <div class="container">
    <h1>continuos feedback app</h1>
    <h2>Salut, bine ai revenit,  { student&&student.firstName + ' ' + student.lastName}!</h2>
    <h3>Dorești să te inrolezi activitate noua?</h3>
    <button type="button" class="custombtn">Inrolare activitate</button>
    <h3>Dorești să setezi activitatea ca default</h3>
    <button type="button" class="custombtn">Setare default</button>
</div>
);
}

export default StudentPage;
