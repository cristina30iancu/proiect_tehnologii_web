import LoginForm from './components/loginForm';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProfessorPage from './pages/ProfessorPage';
import StudentPage from './pages/StudentPage';
import jwt_decode from 'jwt-decode';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfessor, setIsProfessor] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const data = jwt_decode(token);
        setIsLoggedIn(true);
        setIsProfessor(data.userType == 2);
      } catch (e) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const onLogin = (enteredEmail, enteredPassword) => {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Email sau parola gresite!');
        }
      })
      .then((data) => {
        if (data.message) {
          if (enteredEmail.split('@')[1] === 'stud.ase.ro' ) {
            setIsProfessor(false);
          } else setIsProfessor(true);
          localStorage.setItem('token', data.token);
          setIsLoggedIn(true);
        }
      })
      .catch((e) => console.log(e.message));
  };
  const onLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsProfessor(false);
  };
  return (
    <div>
      <Navbar onLogout={onLogout} isLoggedIn={isLoggedIn} />
      {isLoggedIn === false ? <LoginForm onLogin={onLogin} /> : ''}{' '}
      {isLoggedIn && isProfessor ? <ProfessorPage /> : ''}
      {isLoggedIn && !isProfessor ? <StudentPage /> : ''}
    </div>
  );
}

export default App;
