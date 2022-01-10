import { useState, useEffect } from 'react';

function ProfessorPage() {

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
        setProfessor(data.dataValues)
      });
  };

  
useEffect(getBackendData, []);
const [professor,setProfessor] = useState();
  return (
    // <div className='pagina'>  ProfessorPage
    // <h1 className='textPagina'>
    //     Bine ai venit,  { professor&&professor.firstName + ' ' + professor.lastName}
    //   </h1>    
    // </div>
    
<div class="container">
    <h1>continuos feedback app</h1>

    <h2>Buna ziua, domnule profesor!</h2>

    <h3>Doriti să creați o activitate noua?</h3>
    <button type="button" class="custombtn">Creare activitate</button>
    <h3>Doriti să revedeți feedback-ul unei activități</h3>
    
    <button type="button" class="custombtn">Vizualizare feedback</button>
</div>
  );
  
}

export default ProfessorPage;
