/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import './NavBar.css';

import { useUser } from "../../store";

const NavBar = () => {

    const history = useHistory();
    const {user, setUser, token, setToken} = useUser();

    const logout = async () => {
        try {
            const fetchResult = await fetch('http://localhost:8080/auth/logout-cookie', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({})                
            });
             
            if (fetchResult.status === 200) {
                setUser(null);
                setToken('');
                history.push('/login');
            } else {
                throw new Error(`Invalid logout, smth gone wrong`);
            }

        } catch (e) {
            console.log(`Err, could not logout: ${e}`);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-continer">                    
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <Link to="/about-us">
                                About us.
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register">
                                Registration
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={() => logout()}>
                                Logout
                            </button>
                        </li>
                        <li>
                            <Link to="/">
                                Projects list
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;