import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import {Grid} from '@mui/material'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function GamePage() {
    const navigate = useNavigate()
    const [yourPlay, setYourPlay] = React.useState('')
    const [yourGuess, setYourGuess] = React.useState('')
    const [yourScore, setYourScore] = React.useState(0)
    const [botScore, setBotScore] = React.useState(0)

    const handleClick = (event) => {
        console.log("GamePage: handleClick");
        event.preventDefault();
    }

    const handleSignout = (event) => {
        console.log("GamePage: handleSignout");
        event.preventDefault();
        axios.get("http://localhost:3001/auth/signout/")
        .then(response => {
            console.log(response);
            navigate('/signin');
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleUserDetails = (event) => {
        console.log("GamePage: handleUserDetails");
        event.preventDefault();
        axios.get("http://localhost:3001/api/users/"+localStorage.getItem('user_id'), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/users/')
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // }, [])
    
    return (
        <div>
            <h1>GamePage</h1>
            <Grid container
                spacing={3}>
                <Grid item
                    xs={12}>
                    <TextField id="outlined-basic" label="Your Play" variant="outlined"/
                    >
                </Grid>
                <Grid item
                    xs={12}>
                    <TextField id="outlined-basic" label="Your Guess" variant="outlined"/
                    >
                        </Grid>
                <Grid item
                    xs={12}>
                    <Button variant="contained" color="primary"
                        onClick={handleClick}>
                        Submit
                    </Button>
                    </Grid>
                <Grid item
                    xs={12}>
                    <Button variant="contained" color="primary"
                        onClick={handleSignout}>
                        Sign Out
                    </Button>
                </Grid>
                <Grid item
                    xs={12}>
                    <Button variant="contained" color="primary"
                        onClick={handleUserDetails}>
                        Get User Details
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
