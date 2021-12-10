/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router';

import { useUser } from '../../store';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, setUser, token, setToken } = useUser();
    const history = useHistory();

    const onSubmit = async (event) => {
        event.preventDefault();        

        try {
            const userDataForServer = {                
                email: email,
                password: password,
            };

            //console.log(`email=${email}, pass=${password}`);            
            
            const fetchResult = await fetch('http://localhost:8080/users/login-cookies', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                    // "withCredentials": "true"
                },
                body: JSON.stringify({user: userDataForServer}),
            });

            const res = await fetchResult.json();

            console.log(`login res : ${JSON.stringify(res, null, 4)}`);

            // set user.     
            const userData = {
                name: res.user.name,
                email: res.user.email,                
            };
            setUser(userData);

            // Set token.
            setToken(res.access_token);

            // Go to Home page.
            history.push("/");

        } catch (e) {
            console.log(`Error : ${e}`);
        }
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
            {
                user === null ? (
                    <>
                        <h3>Login page.</h3>

                        <form onSubmit={onSubmit}>
                            <h1>Please Login into Account</h1>  

                            Email: <input type="text" name="email" value={email} onChange={handleEmailChange} required/><br/>
                            Password: <input type="text" name="password" value={password} onChange={handlePasswordChange} required/><br/>
                            <button type="submit">
                                Login
                            </button>
                        </form>
                        <div id="some_test_110">

                        </div>
                    </>
                ) 
                :
                (
                    <>
                        <Redirect to="/" />
                    </>
                )
            }
        </div>
    )
}

export default SignIn
