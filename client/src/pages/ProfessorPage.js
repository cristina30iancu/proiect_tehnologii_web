import { useState, useEffect, useRef } from 'react';
import Activity from '../components/Activity';
import Feedback from '../components/Feedback';

function ProfessorPage() {
  const [createActivity, setCreateActivity] = useState(false);
  const [createdActivity, setCreatedActivity] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showHome, setShowHome] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [professor, setProfessor] = useState();
  const [activities, setActivities] = useState([]);
  const [chosen, setChosen] = useState();
  const [arrayTypes, setArrayTypes] = useState([]);
  const cod = useRef();
  const codPtFeedback = useRef();
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
  const getAllActivities = (prof) => {
    fetch(`http://localhost:3001/activities/users/${prof.id}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .then((data) => {
        setActivities(data)
        console.log(data[0])
      });
  };
  
const getFeedbackOfActivity = (activity) =>{
  let id;
  if(!activity){
   activities.map(a=>{
     console.log(codPtFeedback.current.value)
         if(a.code == codPtFeedback.current.value){
            id = a.id;
          
          }
         })
  } else id = activity.id;
  console.log(id)
  fetch(`http://localhost:3001/feedbacks/activity/${id}`, {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
    .then((data) => {
        setFeedbacks(data)
        console.log(data)
        let e =0 , g =0 , a=0 , p = 0;
        for(let f of data){
          if(f.type == 'EXCELENT'){
              e++;
          } else if(f.type == 'GOOD'){
g++;
          } else if(f.type == 'AVERAGE'){
a++;
          } else if(f.type == 'POOR'){
p++
          } 
        }
        let array = [e,g,a,p];
        setArrayTypes(array);
    }).catch(error => {let array = [0,0,0,0];
      setArrayTypes(array);});
};
// const getAllFeedbacks = () => {
//   fetch(`http://localhost:3001/feedbacks/all`, {
//     method: 'GET',
//     headers: {
//       Authorization: localStorage.getItem('token'),
//       'Content-Type': 'application/json',
//     },
//   }).then((res) => res.json())
//     .then((data) => {
//       setFeedbacks(data)
//       console.log(data)
//     });
// };


  useEffect(getBackendData, []);
  

  function showForm() {
    setCreatedActivity(false)
    setCreateActivity(true)
    setShowHome(false)
    setShowFeedback(false)
  }
  function hideForm() {
    setCreateActivity(false)
    setShowHome(true)
    setCreatedActivity(false)
    setShowFeedback(false)
  }
  function showActivity() {
    setCreatedActivity(true)
    setCreateActivity(false)
    setShowFeedback(false)
    setShowHome(false)
  }
  function showFeedbackPage(){
    setCreatedActivity(false)
    setCreateActivity(false)
    setShowHome(false)
    setShowFeedback(true)
  }
  
  const showAddActivityPage = (
    <div className="container">
       <button onClick={hideForm}   className='button-27'>mergi inapoi</button>
      <h1>Creare activitate</h1>
      <label for="cod"><b>Cod Activitate</b></label>
      <input type="descriere" placeholder="Introduceti cod" ref={cod} name="cod" id="cod" required></input>

      <label for="descriere"><b>Descriere Activitate</b></label>
      <input type="descriere" placeholder="Introduceti descriere" ref={descriere} name="descriere" id="descriere" required></input>

      <label for="date"><b>Data activitate</b></label>
      <input type="date" placeholder="Data activitate" ref={date} name="data" id="data" required></input>

      <button type="submit" className="custombtn" onClick={() => {
         makeRequest(professor);
        getAllActivities(professor);
        showActivity();
      }}
      >Creare activitate</button>
    </div>
  )
  const profPage = (
    <div className="container">
      <h1>Buna ziua, domnule profesor  {professor && professor.firstName + ' ' + professor.lastName}!</h1>
      <hr/>
<br/>
      <h3>Doriti să creați o activitate noua?</h3>
      <button type="button" className="custombtn" onClick={showForm} >Creare activitate</button>
      <h3>Doriti vedeți activitățile dvs</h3>
      <button type="button" onClick={() => {
        getAllActivities(professor);
        showActivity();
      }} className="custombtn">Vizualizare activități</button>
      <h3>Doriti să revedeți feedback-ul unei activități</h3>
      <button type="button" onClick={() => {
          getAllActivities(professor);
        showFeedbackPage();
      }} className="custombtn">Vizualizare feedback</button>
    </div>)


  const addedActivity = (
    <div className="page-content">
      <div className="professors-display row col-xs-12">
        <div className="title">
          <button onClick={hideForm}   className='button-27'>mergi inapoi</button>
        <h1>Activitatile create</h1></div>
        <div  className="professor-list row">
        <img src={'https://media.istockphoto.com/photos/gray-abstract-minimal-motion-backgrounds-loopable-elements-4k-picture-id1174989482?b=1&k=20&m=1174989482&s=170667a&w=0&h=ld7ukW9KTzUlJLc6c37C2xs5ESYP2wLyjxsEVCumn2s='} className="prof-background"></img>
          <div className="professor-cards row" >
            {activities.map((activity,i) => (
              <Activity key={i}
                activity={activity}
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
  )
  
  const feedBackPage = (
    <div class="container">
       <button onClick={hideForm}   className='button-27'>mergi inapoi</button>
<h1>Vizualizare feedback</h1>
<hr/>
<br/>
<label id="label" for="idactivitate">COD Activitate:</label>
<input type="text"  ref={codPtFeedback} placeholder='cod' id="idactivitate" name="idactivitate"></input>
<button type="button" className="custombtn" onClick={()=>getFeedbackOfActivity(null)} >Afisare</button>
<br/><br/>
<h1>Istoric de feedback</h1>
<table class='tablefeedback'>
  <thead>
    <tr>
        <th>💓</th>
        <th>😀</th>
        <th>🙁</th>
        <th>😣</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td >{arrayTypes[0]}</td>
        <td>{arrayTypes[1]}</td>
        <td>{arrayTypes[2]}</td>
        <td>{arrayTypes[3]}</td>
    </tr>
    </tbody>
</table>
</div>
  );

  return (
    <div >
      {createActivity  ? showAddActivityPage : 
        showHome ? profPage : 
          showFeedback ? feedBackPage : 
          createdActivity  ? addedActivity : profPage
          }
    </div>
  )
}

export default ProfessorPage;
