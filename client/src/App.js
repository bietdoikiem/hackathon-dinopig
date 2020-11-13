import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import './components/Form.css'
import NavigationBar from './components/navigation/NavigationBar.js';
import LoginForm from './components/login/LoginForm';
import SignUpForm from './components/signup/SignUpForm';

function App() {
  return (
    <BrowserRouter>
			<div className="App">
				<div className="wrapper">
					<NavigationBar></NavigationBar>
					<Switch>
            <Route path="/signin" component={LoginForm}/>
            <Route path='/signup' component={SignUpForm}/>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
  );
}

export default App;
