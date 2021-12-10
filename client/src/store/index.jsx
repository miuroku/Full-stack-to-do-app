/* eslint-disable no-unused-vars */
import React, { useContext, createContext, useState, useEffect } from "react";


// Client context stuff.

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);


export const UserWrapper = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const [working, setWorking] = useState(true); // Sort out why we are using that weird thing ...

    const [count, setCount] = useState(0);


    function incrementCount (state, props) {
        const newState = state + 1;        
        //const element = document.getElementById("some_test_10");            
        //if (element) element.innerHTML = `num (${state}) $$$ = ${JSON.stringify(props, null, 4)}`;
        return newState;
    }

    const refreshOurAccessToken = async () => {
        try {            
            const fetchResult = await fetch('http://localhost:8080/auth/access-token-cookies', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({})                
            });
            
            const result = await fetchResult.json();            

            const timeForTimeout = 10000;

            // If token wasn't found.
            if (result.message) {
                setUser(null);
                setToken('');                
                setTimeout(() => {
                    refreshOurAccessToken();
                }, timeForTimeout);       
                console.log(`Access token was not found ...`);       
            } else {
                
                //console.log(`Res : ${JSON.stringify(result, null, 4)}`);
    
                setCount(incrementCount);
    
                // Make request for that every 6 seconds.
    
                //const timeForTimeout = result.expires_in;
    
                setTimeout(() => {
                    refreshOurAccessToken();
                }, timeForTimeout);
    
                // Set user ...
                const userData = {
                    name: result.user.name,
                    email: result.user.email
                }
                setUser(userData);
    
                // Set token ...
                setToken(result.access_token);            
            }

        } catch (e) {
            console.log(`Error : ${e}`);
        } finally {
            setWorking(false);
        }
    };

    useEffect(() => {
        refreshOurAccessToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //console.log(`# Count : ${count}`);
    }, [count])

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
              {working ? null : children}
              {/* {children} */}
            <div id="some_test_10">

            </div>
        </UserContext.Provider>
    );
};