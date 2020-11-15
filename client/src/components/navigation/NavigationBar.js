import React, { useState } from "react";
import { Link, NavLink, BrowserRouter } from "react-router-dom";
import {useHistory} from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar(props) {
	const [isAuthenticated, setAuthenticate] = useState(window.sessionStorage.getItem('isAuthenticated'))
	const [username, setUsername] = useState(window.sessionStorage.getItem('username'))
	let history = useHistory();
	function logout(event){
        event.preventDefault();
        window.sessionStorage.setItem('isAuthenticated', 0);
        setAuthenticate(window.sessionStorage.getItem('isAuthenticated'));
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("username");
		history.push("/")
		window.location.reload()
    }
	return (
		<div className="nav-container">
			<nav className="flexbox">
				<div className="flexbox-left">
					<NavLink className="navtags-logo" activeClassName="logo" exact to="/">
						<img className="App-logo" src="./logo.png" />
					</NavLink>
				</div>
				<div className="flexbox-right">
					{isAuthenticated == 1 && (
						<>
							<NavLink className="navtags" activeClassName="selected" to="/user">
								{username}
							</NavLink>
							<NavLink className="navtags" onClick={logout} activeClassName="selected-btn" to="/about">
								Sign out
							</NavLink>
						</>
					)}
					{isAuthenticated == 0 &&(
						<>
					<NavLink className="navtags" activeClassName="selected" to="/signin">
						Sign in
					</NavLink>
					<NavLink className="navtags" activeClassName="selected-btn" to="/signup">
						Sign up
					</NavLink>
					</>
					)}
				</div>
			</nav>
		</div>
	);
}

export default NavigationBar;