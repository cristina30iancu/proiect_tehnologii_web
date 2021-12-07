function Navbar(props) {
  return (
    //  <div className='navbar'>
    <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div id='leftNav'>
        {' '}
        <img
          id='logo'
          src='https://s35691.pcdn.co/wp-content/uploads/2015/08/iStock_lecture-hall_Medium-150902.jpg'
          alt='Logo'
        />
      </div>
      <div id='divLogOut'>
        {props.isLoggedIn && (
          <a
            id='btnLogOut'
            className='btn btn-secondary my-2 my-sm-0'
            onClick={props.onLogout}
            href='/#'
          >
            Logout
          </a>
        )}{' '}
      </div>
    </div>
  );
}

export default Navbar;
