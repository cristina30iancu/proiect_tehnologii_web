import { useState, useEffect, useRef } from 'react';

function ProfessorPage() {
  const [createActivity, setCreateActivity] = useState(false);

  const cod = useRef();
  const descriere = useRef();
  const date = useRef();

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

  const makeRequest = (prof) => {
    fetch(`http://localhost:3001/activities/${prof.id}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: date.current.value,
        description: descriere.current.value,
        code: cod.current.value,
      }),
    });
  };

useEffect(getBackendData, []);
const [professor,setProfessor] = useState();

function showForm() {
  setCreateActivity(true)
}
function hideForm() {
  setCreateActivity(false)
}
const showAddActivityPage = (
  <div class="container">
<h1>Creare activitate</h1>
<label for="cod"><b>Cod Activitate</b></label>
<input type="descriere" placeholder="Introduceti cod"  ref={cod} name="cod" id="cod" required></input>

<label for="descriere"><b>Descriere Activitate</b></label>
<input type="descriere" placeholder="Introduceti descriere" ref={descriere} name="descriere" id="descriere" required></input>

<label for="date"><b>Data activitate</b></label>
<input type="date" placeholder="Data activitate"  ref={date} name="data" id="data" required></input>

<button type="submit" class="custombtn" onClick={() => {
                  makeRequest(professor);
                  hideForm();
                }}
              >Creare activitate</button>
</div>
)
  const profPage = (
   <div class="container">
    <h1>continuos feedback app</h1>
    <h2>Buna ziua, domnule profesor  { professor&&professor.firstName + ' ' + professor.lastName}!</h2>
    <h3>Doriti să creați o activitate noua?</h3>
    <button type="button" class="custombtn" onClick={showForm} >Creare activitate</button>
    <h3>Doriti să revedeți feedback-ul unei activități</h3>
    <button type="button" class="custombtn">Vizualizare feedback</button>
</div>);

  return (
<div class="container">
{ createActivity ? showAddActivityPage : profPage  };
</div>
  );
}

export default ProfessorPage;
