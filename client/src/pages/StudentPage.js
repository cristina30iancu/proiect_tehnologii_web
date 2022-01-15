import { useState, useEffect, useRef } from 'react';

function StudentPage() {
  const [createFeedback, setCreateFeedback] = useState(false);
  const [createdFeedback, setCreatedFeedback] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState();
  const [showHome, setShowHome] = useState(false);
  const [student,setStudent] = useState();

  const cod = useRef();
  const descriere = useRef();
  const tip = useRef();
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const getActivities = (student) => {
    fetch(`http://localhost:3001/activities`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setActivities(data)
      }).then(()=>{
        console.log(activities)
        let activity2 = null;
       activities.map(a=>{
         console.log(a.code + ' '+cod.current.value)
           if(a.code == cod.current.value)
           setActivity(a)
            activity2 = a;
       })
       fetch(`http://localhost:3001/users/${student.id}/activities/${activity.id}/enroll`, {
         method: 'POST',
         headers: {
           Authorization: localStorage.getItem('token'),
           'Content-Type': 'application/json',
         },
       });
      });
  };
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
        console.log(data.dataValues);
      });
  };
// POST a new user into an activity -> enroll.
// app.post('/users/:userId/activities/:activityId/enroll',async (request, response, next) => {
   
// GET the list of enrolled activities of a student
// app.get('/users/:userId/enrollment', authenticationMiddleware,async (req, response, next) => {
  
  const makeRequest = (student) => {
    getActivities();
    console.log(activities)
     let activity2 = null;
    activities.map(a=>{
      console.log(a.code + ' '+cod.current.value)
        if(a.code == cod.current.value)
        setActivity(a)
         activity2 = a;
    })
    fetch(`http://localhost:3001/users/${student.id}/activities/${activity2.id}/enroll`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
  };

  // POST a new feedback made by a user at an activity.
// app.post('/users/:userId/activities/:activityId',authenticationMiddleware, async (req, response, next) => {
  // http://localhost:3001/feedbacks/users/1/activities/a3dd8247-cf56-4616-8f39-a663fc8605e7
  const postFeedback = (stud,activity) => {
    fetch(`http://localhost:3001/feedbacks/users/${stud.id}/activities/${activity.id}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: date,
        description: descriere.current.value,
        type: tip.current.value,
      }),
    });
  };
  
useEffect(() => {
  getBackendData();
}, []);


function showForm() {
  setCreatedFeedback(false)
  setCreateFeedback(true)
  setShowHome(false)
}

const showAddFeedback = (
  <div class="container">
    <h1>Trimitere feedback</h1>
    <label for="id"><b>COD Activitate</b></label>
    <input type="text" ref={cod} placeholder="Introduceti codul" name="ID" id="ID" required=""></input>
    <button type="submit" class="custombtn" onClick={() => {
        getActivities(student)
      }}>Inrolare activitate</button>
    <label for="descriere"><b>Descriere Feedback</b></label>
    <input type="text" ref={descriere} placeholder="Introduceti o descriere" name="descriere" id="descriere" required=""></input>
    <label for="emoji"><b>Selecteaza tipul de emoji pe care dorești să-l oferi activității!</b></label> 
    <select ref={tip} name="wgtmsr" id="selectImoji">
      <option  value="EXCELENT">Excelent 💓</option>
      <option value="GOOD">Good 😀</option>
      <option value="AVERAGE">Average 🙁</option>
      <option  value="POOR">Poor 😣</option>
    </select>
    <button type="submit" class="custombtn" onClick={() => {
        postFeedback(student,activity)
      }}>Trimitere feedback</button>
  </div>
);


const studPage = (
  <div class="container">
  <h1>Salut, bine ai revenit,  { student&&student.firstName + ' ' + student.lastName}!</h1>
  <h3>Dorești să te inrolezi intr-o activitate noua?</h3>
  <button type="button" class="custombtn"  onClick={showForm}>Inrolare activitate</button>
  <h3>Dorești să setezi activitatea ca default?</h3>
  <button type="button" class="custombtn">Setare default</button>
</div>
);

return (
  <div >
  {createFeedback  ? showAddFeedback : studPage}
  {showHome ? studPage : 'nne'}
  {/* {createdFeedback  ? addedFeedback : 'none'} */}
</div>
);
}

export default StudentPage;
