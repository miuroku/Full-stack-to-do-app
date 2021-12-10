import React from 'react'
import Footer from '../Footer/Footer';

import { useUser } from './../../store';

function Home() {  

    // eslint-disable-next-line
    const { user, setUser, token } = useUser();

    return (
        <div>
            <div>
                Home kek. <br/>                
                Some Form : <br/>                    
                <button type="submit">
                    Set new cookies.
                </button>
                <form onSubmit={() => 1+1}>
                    <input type="text"/>
                    <button type="submit">
                        Get smth using cookies.
                    </button>                
                </form>
                <div id="some_test_0">
                    {
                        user !== null ? (
                            <>
                                <p>Hello, "{user?.name}" user !</p>
                                <p>Your token is : {token}</p>
                            </>
                        ) 
                        :
                        <></>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Home
