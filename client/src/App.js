import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import './components/Form.css'
import NavigationBar from './components/navigation/NavigationBar.js';
import LoginForm from './components/login/LoginForm';
import SignUpForm from './components/signup/SignUpForm';
import StudentHome from './pages/StudentHome';
import Assignment from './pages/studentView/Assignment.js'
import Course from './pages/studentView/Course'

function App() {
  return (
    <BrowserRouter>
			<div className="App">
				<div className="box">
					<div className="row header no-gutters">
						<NavigationBar></NavigationBar>
					</div>
					<div className="row content no-gutters">
						<div className="col-12">
					<Switch>
						<Route path="/signin" component={LoginForm}/>
						<Route path='/signup' component={SignUpForm}/>
						<Route exact path='/user/:id' component={StudentHome}/>
						<Route exact path='/user/:id/course/:courseId/assignment/:assignmentId' component={Assignment}/>
						<Route exact path='/user/:id/course/:courseId' component={Course}/>
					</Switch>
					</div>
					</div>
				</div>
			</div>
		</BrowserRouter>

  );
}

export default App;
