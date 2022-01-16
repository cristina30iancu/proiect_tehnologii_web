import logo from "../media/logo-2.svg"

function Navbar(props) {
  return (
<nav className="navbar navbar-dark bg-dark justify-content-between sticky-top" id="navbar">
    <div className="nav-left">
    <img src={logo} id="logo"></img>
        {props.isLoggedIn && (
           <a
             id='btnLogOut'
            className="nav-item"
             onClick={props.onLogout}
             href='/#'
           >
             Logout
           </a>
         )}{' '}
    </div>
</nav> 
  );
};

export default Navbar;
