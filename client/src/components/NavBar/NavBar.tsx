/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import './NavBar.css';
import logo from './../../assets/to-do-logo.jpeg';

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
        <header className="header">
            <img className="logo" alt="to-do-app-logo" src={logo}/>
            <nav className="navbar">                
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link className="a" to="/about-us">
                            About us (Home)
                        </Link>
                    </li>
                    {user == null ? (
                        <>     
                            <li className="nav-item">
                                <Link className="a" to="/register">
                                    Registration
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="a" to="/login">
                                    Login
                                </Link>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                    <li className="nav-item">                        
                        <Link className="a" to="/login" onClick={() => logout()}>
                            Logout
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="a" to="/">
                            Projects list
                        </Link>
                    </li>
                </ul>                
            </nav>
            <div className="nav-item">
                <a className="a" href="#">
                    Contact                    
                </a>
            </div>
            { user !== null ? (
                    <div className="nav-item">                        
                        <a className="a" href="#">
                            <div className="hello-user-navbar">
                                Hello, "{user.name}" user !
                            </div>
                        </a>
                    </div>
                )
                :
                (
                    <>
                    </>
                )
            }
        </header>
    );
};

export default NavBar;