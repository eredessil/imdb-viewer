import React, {useEffect} from 'react';
import './App.scss';
import {Api} from "../api";

function App() {
    const client = new Api();

    useEffect(() => {
        client.getMovie('76341').then(console.log);
    }, [])
    return (
        <div className={'main-container'}>
        </div>
    );
}

export default App;
