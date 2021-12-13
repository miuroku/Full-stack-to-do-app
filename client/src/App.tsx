/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import './App.css';

import Login from './components/AuthPages/Login';
import Registration from './components/AuthPages/Registration';
import ProjectsList from './components/ProjectsList/ProjectsList'; // Unauthorized user cannot get that page!
import TasksList from './components/TasksList/TasksList';

import Footer from './components/Footer/Footer';

// For providing 'UserContext' in every component it needed by using 'const user = useUser()'.
import { UserWrapper } from './store';

const App: React.FC = () => {    

  return (
    <>
        <UserWrapper>
            <Router>
                <div className="main-container">
                    <NavBar/>
                    <div className="main-content-container">
                        <Switch>
                            <Route exact path="/about-us" component={Home} />                
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Registration}/>
                            <Route exact path="/" component={ProjectsList}/>
                            <Route exact path="/tasks-list/:id" component={TasksList} />
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </Router>
        </UserWrapper>
    </>
  );
}


export default App;