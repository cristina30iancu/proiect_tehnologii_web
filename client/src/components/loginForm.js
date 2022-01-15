import { useRef } from 'react';

function LoginForm(props) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const LoginHandler = (e) => {
    e.preventDefault();
    props.onLogin(emailRef.current.value, passwordRef.current.value);
  };

  const changeLogIn = (e) => {
    e.preventDefault();
    document.querySelector('.cont_forms').className =
      'cont_forms cont_forms_active_login';
    document.querySelector('.cont_form_login').style.display = 'block';
    document.querySelector('.cont_form_sign_up').style.opacity = '0';

    setTimeout(function () {
      document.querySelector('.cont_form_login').style.opacity = '1';
    }, 400);

    setTimeout(function () {
      document.querySelector('.cont_form_sign_up').style.display = 'none';
    }, 200);
  };

  const changeSignUp = (e)=> {
    e.preventDefault();
    document.querySelector('.cont_forms').className =
      'cont_forms cont_forms_active_sign_up';
    document.querySelector('.cont_form_sign_up').style.display = 'block';
    document.querySelector('.cont_form_login').style.opacity = '0';

    setTimeout(function () {
      document.querySelector('.cont_form_sign_up').style.opacity = '1';
    }, 100);

    setTimeout(function () {
      document.querySelector('.cont_form_login').style.display = 'none';
    }, 400);
  }

  return (
    <div class="cotn_principal">
      <div class="cont_centrar">
        <div class="cont_login">
          <div class="cont_info_log_sign_up">
            <div class="col_md_login">
              <div class="cont_ba_opcitiy">
                <h2>LOGIN</h2>
                <p>Daca ai deja un cont...</p>
                <button class="btn_login" onClick={changeLogIn}>
                  LOGIN
                </button>
              </div>
            </div>
            <div class="col_md_sign_up">
              <div class="cont_ba_opcitiy">
                <h2>SIGN UP</h2>

                <p>Nu ai cont?</p>

                <button class="btn_sign_up" onClick={changeSignUp}>
                  SIGN UP
                </button>
              </div>
            </div>
          </div>

          <div class="cont_back_info">
            <div class="cont_img_back_grey">
              <img
                src="https://foodtank.com/wp-content/uploads/2021/07/alfons-morales-YLSwjSy7stw-unsplash.jpg"
                alt=""
              />
            </div>
          </div>
          <div class="cont_forms">
            <div class="cont_img_back_">
              <img
                src="https://foodtank.com/wp-content/uploads/2021/07/alfons-morales-YLSwjSy7stw-unsplash.jpg"
                alt=""
              />
            </div>
            <div class="cont_form_login">
              <a href="#" onClick={LoginHandler}>
                <i class="material-icons">&#xE5C4;</i>
              </a>
              <h2>LOGIN</h2>
              <input type="text" ref={emailRef} placeholder="Email" />
              <input type="password" ref={passwordRef} placeholder="Password" />
              <button class="btn_login" onClick={LoginHandler}>
                LOGIN
              </button>
            </div>

            <div class="cont_form_sign_up">
              <a href="#" onClick={LoginHandler}>
                <i class="material-icons">&#xE5C4;</i>
              </a>
              <h2>SIGN UP</h2>
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Nume" />
              <input type="text" placeholder="Prenume" />
              <input type="password" placeholder="Parola" />
              <button class="btn_sign_up" onClick={changeSignUp}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;