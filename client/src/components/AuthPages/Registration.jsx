/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
//import { printAllObject } from '../../App';

import { useUser } from '../../store';

const Registration = () => {

    //const [user, setUser] = useUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, setUser, token, setToken } = useUser();
    const history = useHistory();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // TO-DO: make some validations for name, email, password here !
        try {
            const userDataForServer = {
                name: name,
                email: email,
                password: password,
            };            

            // Quering the server.
            const fetchResult = await fetch('http://localhost:8080/users/register-cookies', {
                method: "POST",
                credentials: "include",                
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({user: userDataForServer})
            });            

            const res = await fetchResult.json();   
            
            if (!res.message) {
                // Set user.
                const userData = {
                    name: res.user.name,
                    email: res.user.email,                
                };
                setUser(userData);
    
                // Set token.
                setToken(res.access_token);
    
                // Go to home page.
                history.push('/');                
            } else {
                console.log(`Could not register: msg from server : ${res.message}`)
            }

        } catch (e) {
            console.log(`Err: ${e}`);
        }
    };

    

    const handleNameChange = (event) => {
        setName(event.target.value);
        const element = document.getElementById("some_test_1");
        if (element) element.innerHTML = ` - name = ${event.target.value}`;
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        const element = document.getElementById("some_test_2");
        if (element) element.innerHTML = ` - email =  ${event.target.value}`;
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        const element = document.getElementById("some_test_3");
        if (element) element.innerHTML = ` - pass =  ${event.target.value}`;
    };    

    return (                    
        <div>
            {user === null ? (
            <>
                <form onSubmit={onSubmitHandler}>
                    <h1>Please register a new Account</h1>  

                    Name: <input type="text" name="name" value={name} onChange={handleNameChange} required/><br/>
                    Email: <input type="text" name="email" value={email} onChange={handleEmailChange} required/><br/>
                    Password: <input type="text" name="password" value={password} onChange={handlePasswordChange} required/><br/>
                    
                    <button type="submit">
                        Create an Account
                    </button>
                    <p>
                        Already registred ? <Link to="/login">Sign in here</Link>
                    </p>
                </form>

                <hr/>

                <h3 id="some_test_1"></h3>
                <h3 id="some_test_2"></h3>
                <h3 id="some_test_3"></h3>
                <h3 id="some_test_0"></h3>
                <h3 id="some_test_7"></h3>
            </>
            )
            :
            (
                <>
                    <Redirect to="/" />
                </>
            )}                        
        </div>        
    )
}

export default Registration
