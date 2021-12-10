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

// For providing 'UserContext' in every component it needed by using 'const user = useUser()'.
import { UserWrapper } from './store';

const App: React.FC = () => {    

  return (
    <div>
        <UserWrapper>
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path="/about-us" component={Home} />                
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Registration}/>
                    <Route exact path="/" component={ProjectsList}/>
                    <Route exact path="/tasks-list/:id" component={TasksList} />
                </Switch>
            </Router>
        </UserWrapper>
    </div>
  );
}

export function printAllObject(obj: Object): string {
    let result_string = "";
    for (const [key, val] of Object.entries(obj)) {
        result_string += `# [key, val]: "${key}": "${val}"\n`;
        if (typeof val == "object") {
            result_string += printAllObject(val);
        }
    }

    console.info(`Object => ${result_string}`);
    return result_string;
}


export default App;