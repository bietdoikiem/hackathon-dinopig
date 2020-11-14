import React, { useState } from "react";
import { Link, NavLink, BrowserRouter } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
	return (
		<div className="nav-container">
			<nav className="flexbox">
				<div className="flexbox-left">
					<NavLink className="navtags-logo" activeClassName="logo" exact to="/">
						<img className="App-logo" src="./logo.png" />
					</NavLink>
				</div>
				<div className="flexbox-right">
					<NavLink className="navtags" activeClassName="selected" to="/signin">
						Sign in
					</NavLink>
					<NavLink className="navtags" activeClassName="selected-btn" to="/signup">
						Sign up
					</NavLink>
				</div>
			</nav>
		</div>
	);
}

export default NavigationBar;