import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import './components/Form.css'
import NavigationBar from './components/navigation/NavigationBar.js';
import LoginForm from './components/login/LoginForm';
import SignUpForm from './components/signup/SignUpForm';
import StudentHome from './pages/StudentHome';

function App() {
  return (
    <BrowserRouter>
			<div className="App">
				<div className="wrapper">
					<NavigationBar></NavigationBar>
					<Switch>
            <Route path="/signin" component={LoginForm}/>
            <Route path='/signup' component={SignUpForm}/>
            <Route path='/user' component={StudentHome}/>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
  );
}

export default App;
