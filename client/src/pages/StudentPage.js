import { useState, useEffect, useRef } from 'react';
import Feedback from '../components/Feedback';

function StudentPage() {
  const [createFeedback, setCreateFeedback] = useState(false);
  const [createdFeedback, setCreatedFeedback] = useState(false);
  const [activities, setActivities] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
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
        console.log(data[0].id)
        let activity2 = null;
        data.map(a=>{
         console.log(a.code + ' '+cod.current.value)
           if(a.code == cod.current.value){
            setActivity(a)
            activity2 = a;
            fetch(`http://localhost:3001/users/${student.id}/activities/${activity2.id}/enroll`, {
              method: 'POST',
              headers: {
                Authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json',
              },
            });
           }
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

  const getAllFeedbacks = () =>{
    fetch(`http://localhost:3001/feedbacks`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data)
        console.log(data)
      })
  };

const addedFeedback = (
  <div className="page-content">
  <div className="professors-display row col-xs-12">
    <div className="title">
      <button onClick={hideForm}   className='button-27'>mergi inapoi</button>
    <h1>Feedbackul a fost transmis!</h1></div>
    <div  className="professor-list row">
    <img src={'https://media.istockphoto.com/photos/gray-abstract-minimal-motion-backgrounds-loopable-elements-4k-picture-id1174989482?b=1&k=20&m=1174989482&s=170667a&w=0&h=ld7ukW9KTzUlJLc6c37C2xs5ESYP2wLyjxsEVCumn2s='} className="prof-background"></img>
      <div className="professor-cards row" >
        {feedbacks.map((feedback,i) => (
          <Feedback key={i}
            feedback={feedback}
            i={i+1}
          />
        ))}
        <div width='100%' onClick={showForm} className='circleplus'>
       <svg width="123" height="122" viewBox="0 0 63 122" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="31.5" cy="31" rx="31.5" ry="31" fill="white">  </ellipse>
            <path id='totranslate' d="M20.6875 12.5312H31.9688V20.6875H20.6875V33.4375H12.0938V20.6875H0.78125V12.5312H12.0938V0.3125H20.6875V12.5312Z" fill="black" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
);
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
    }).then(()=>{
      fetch(`http://localhost:3001/feedbacks`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data)
        console.log(data)
      })
    });
  };
  
useEffect(() => {
  getBackendData();
}, []);
function hideForm() {
  setCreateFeedback(false)
  setShowHome(true)
  setCreatedFeedback(false)
}
function showFeedback() {
  setCreatedFeedback(true)
  setCreateFeedback(false)
}
function showForm() {
  setCreatedFeedback(false)
  setCreateFeedback(true)
  setShowHome(false)
}

const showAddFeedback = (
  <div class="container">
    <button onClick={hideForm}   className='button-27'>mergi inapoi</button>
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
        showFeedback();
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
  {createdFeedback  ? addedFeedback : 'none'}
</div>
);
}

export default StudentPage;
