import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { logout } from "../actions/authActions";

const Header = (props) => {
  const dispatch = useDispatch();
  const authToken = props.authToken
  const history = useNavigate()

  const handleLogoutClick = (event) => {
    event.preventDefault();
    props.logout()
    history('/login');
  };

  return (
    <header className="bg-blue-500 py-4">
      <nav className="flex justify-between items-center container mx-auto">
        <div className="text-white font-bold text-xl">
          Auction
        </div>
        <div>
          <Link to="/" className="px-2 text-white hover:text-gray-300">
            Home
          </Link>
          {authToken !== "" && <button onClick={handleLogoutClick} className="px-2 text-white hover:text-gray-300">Logout</button>}
        </div>
      </nav>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    authToken: state.authToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)
