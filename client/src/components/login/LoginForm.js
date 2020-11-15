import React from "react";
import "./LoginForm.css";
import { NavLink } from "react-router-dom";

export default class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const target = e.target; // Attach target
		const name = target.name; // Attach name
		let value = target.value; // Attach value
		// Set state
		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
        event.preventDefault();
		const requestOptions = {
			method: "POST",

			// Set headers
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},

			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
		};
		fetch("/users/auth/login", requestOptions)
			.then((res) => res.json())
			.then((data) => {
				if (data.token) {
					alert("Login successfully");
					window.sessionStorage.setItem("isAuthenticated", 1);
                    window.sessionStorage.setItem("token", data.token);
                    window.sessionStorage.setItem("username", this.state.username);
					this.props.history.push("/user");
					window.location.reload();
				} else if (data.msg == "Username or password is incorrect") {
					alert("Wrong username or password");
					window.sessionStorage.setItem("isAuthenticated", 0);
					window.location.reload();
				}
			});
	}

	render() {
		return (
			<div class="login-page">
				<div class="form">
					<form class="login-form">
						<img className="form-logo" src="logo.png" />
						<input
							type="text"
							placeholder="username"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
						<input
							type="password"
							placeholder="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						<button onClick={this.handleSubmit.bind(this)}>login</button>
						<p class="message">
							Not registered?
							<NavLink className="navtags" activeClassName="selected-btn" to="/signup">
								{" "}
								Sign up{" "}
							</NavLink>
						</p>
					</form>
				</div>
			</div>
		);
	}
}
