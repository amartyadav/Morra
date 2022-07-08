import './App.css';
import React from 'react';
import Welcome from './Components/Welcome';
import {Routes, Route} from 'react-router-dom';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import GamePage from './Components/GamePage';
import GameHistory from './Components/GameHistory';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Welcome/>}/>
                <Route exact path="signup" element={<Signup/>}/> 
                <Route exact path="signin" element={<Signin/>}/> 
                <Route exact path="gamepage" element={<GamePage/>}/>
                <Route exact path="gamehistory" element={<GameHistory/>}/>
            </Routes>
        </div>
    );
}

export default App;
