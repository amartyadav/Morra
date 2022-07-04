import React from 'react'
import {Link, Routes, Route} from 'react-router-dom'

export default function Welcome() {
    return (
            <div>
                <h1>
                    Welcome to Morra!
                </h1>
                <br/>
                <h2>
                    Only registered users can play the game.
                </h2>
                <Link to="/signup">
                    <h3>Sign Up</h3>
                </Link>
                <br/>
                <h2>Already a user?</h2>
                <Link to="/signin">
                    <h3>Sign In</h3>
                </Link>
                
            </div>
    )
}
