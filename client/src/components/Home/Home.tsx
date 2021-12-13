/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Home.css';
import { Redirect } from 'react-router';
import { useState } from 'react';

//import Statistics from '../Statistics/Statistics';
import { useUser } from './../../store';

function Home() {  

    // eslint-disable-next-line
    const { user, setUser, token } = useUser();

    const [statistics, setStatistics] = useState(false);

    const changeStat = () => {
        setStatistics((prev) => !prev);
    };

    return (
        <div>
            <div className="home-container">                                
                    {
                        user !== null ? (
                            <>
                                <div className="hello-user-message">
                                    <p>Hello, "{user?.name}" user !</p>                                
                                </div>
                                <hr/>
                                <br/>
                                <div className="pre-content-about-statistics">
                                    <p>You can see your statistics about tasks and projects here :</p>
                                </div>
                                <div>
                                    <a href="#" className="btn-3d green" onClick={changeStat}>
                                        Show statistics
                                    </a>
                                </div>
                                { statistics === true ? (
                                    <>
                                        {/* <Statistics/> */}
                                    </>
                                ) 
                                : (
                                    <>
                                    </>
                                )
                                }
                            </>
                        ) 
                        :
                        <>
                            <Redirect to="/login" />
                        </>
                    }                
            </div>            
        </div>
    );
}

export default Home
