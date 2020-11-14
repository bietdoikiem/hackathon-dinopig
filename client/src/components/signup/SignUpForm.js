import React from 'react';
import { NavLink } from 'react-router-dom'
import './SignUpForm.css'
import RadioBtn from './RadioBtn'

export default class SignUpForm extends React.Component {

    constructor() {
        super()
        this.state = {
            'username': '',
            'password': '',
            'email': '',
            'name': '',
            'phone': '',
            'role': ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const target = e.target; // Attach target
        const name = target.name // Attach name
        let value = target.value // Attach value
        // Set state
        this.setState({
            [name]: value
        })

    }

    handleSubmit() {
        const requestOptions = {
            method: 'POST',

            // Set headers
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone
            })
        }
        fetch('', requestOptions)
            .then(res => res.json())
            .then(data => this.setState({}))
    }

    render() {
        return (
            <div class="login-page">
                <div class="form">
                    <form class="register-form">
                        <img className='form-logo' src="logo.png" />
                        <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.handleChange} />
                        <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <input type="text" placeholder="name" name="name" value={this.state.name} onChange={this.handleChange} />
                        <input type="text" placeholder="email address" name="email" value={this.state.email} onChange={this.handleChange} />
                        <input type="text" placeholder="phone number" name="phone" value={this.state.phone} onChange={this.handleChange} />
                        <div className="radio-btn-group">
                            <RadioBtn change={this.handleChange} id="student" isSelected={this.state.role == "student"} label="Student" value="student" />
                            <RadioBtn change={this.handleChange} id="teacher" isSelected={this.state.role == "teacher"} label="Teacher" value="teacher" />
                        </div>
                        <button>create</button>
                        <p class="message">Already registered?
                            <NavLink to="/signin"> Sign in </NavLink>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}