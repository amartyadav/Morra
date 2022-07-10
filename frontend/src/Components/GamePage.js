import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { Grid } from '@mui/material'
import Button from '@mui/material/Button'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'

export default function GamePage() {
    const navigate = useNavigate()
    const [ yourPlay, setYourPlay ] = React.useState(0)
    const [ yourGuess, setYourGuess ] = React.useState(0)
    const [ botPlay, setBotPlay ] = React.useState(0)
    const [ botGuess, setBotGuess ] = React.useState(0)
    const [ yourScore, setYourScore ] = React.useState(0)
    const [ botScore, setBotScore ] = React.useState(0)
    const [ isSignedIn, setIsSignedIn ] = React.useState(false)

    let prevHighScore = parseInt(localStorage.getItem('highScore'));
    let newHighScore = 0;

    useEffect(() => {
        localStorage.getItem("token") === null ? setIsSignedIn(false) : setIsSignedIn(true)
    }, [])

    const handleClick = (event) => {
        console.log("GamePage: handleClick");
        event.preventDefault();
        axios.get("/api/game/").then(response => {
            console.log(response)
            setBotPlay(response.data.fingers)
            setBotGuess(response.data.guess)
            if (parseInt(response.data.guess) === parseInt(yourPlay) + parseInt(response.data.fingers)) {
                setBotScore(botScore + 1)
            }
            if (parseInt(yourGuess) === parseInt(yourPlay) + parseInt(response.data.fingers)) {
                setYourScore(yourScore + 1)
            }
            console.log({
                yourPlay: yourPlay,
                yourGuess: yourGuess,
                botPlay: botPlay,
                botGuess: botGuess,
                yourScore: yourScore,
                botScore: botScore
            })
        })
    }

    const handleEndGame = (event) => {
        console.log("GamePage: handleEndGame");
        event.preventDefault();
        const winner = yourScore > botScore ? "😎" : "😓"
        if (yourScore > prevHighScore) {
            localStorage.setItem('highScore', yourScore)
            console.log("new High score: " + yourScore)
            axios.post("/api/game/highscore/update/" + localStorage.getItem("user_id"), {
                highScore: yourScore
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }

        axios.post("/api/game/save/" + localStorage.getItem("user_id"), {
            userId: localStorage.getItem("user_id"),
            userName: localStorage.getItem("user_name"),
            botScore: botScore,
            yourScore: yourScore,
            winner: winner,
            date: Date.now()
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            alert("Game saved!")
            console.log(response)
            setBotGuess(0)
            setBotPlay(0)
            setBotScore(0)
            setYourGuess(0)
            setYourPlay(0)
            setYourScore(0)
        }).catch(error => {
            console.log(error)
        })
    }

    const handleSignout = (event) => {
        console.log("GamePage: handleSignout");
        event.preventDefault();
        localStorage.clear()
        axios.get("/auth/signout/").then(response => {
            console.log(response);
            navigate('/signin');
        }).catch(error => {
            console.log(error);
        })
    }

    const handleUserDetails = (event) => {
        console.log("GamePage: handleUserDetails");
        event.preventDefault();
        axios.get("/api/users/" + localStorage.getItem('user_id'), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div> {
            !isSignedIn ? (
                <div>
                    <h1>
                        <NavLink to="/signin">Sign In To View This Page</NavLink>
                    </h1>
                </div>
            ) : (
                <div>
                    <h1>GamePage</h1>
                    <AppBar position="static">
                        <Toolbar variant='dense'>
                            <Typography variant="body" component="div"
                                sx={
                                    { flexGrow: 2 }
                                }>
                                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/gamepage">Game Page</NavLink>

                            </Typography>
                            <Typography variant="body" component="div"
                                sx={
                                    { flexGrow: 2 }
                                }>
                                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/gamehistory">Your Games</NavLink>
                            </Typography>
                            <Typography variant="body" component="div"
                                sx={
                                    { flexGrow: 2 }
                                }>
                                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/leaderboard">Public LeaderBoard</NavLink>

                            </Typography>
                            <Typography variant="body" component="div" sx={ { flexGrow: 2 } }>
                                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/events">Events</NavLink>
                            </Typography>
                            <Typography variant="body" component="div"
                                sx={
                                    { flexGrow: 2 }
                                }>
                                <NavLink style={ { textDecoration: 'none', color: 'inherit' } } to="/account">Your Account</NavLink>
                            </Typography>
                            <Button color="inherit"
                                onClick={ handleSignout }>
                                Sign Out
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <br /><br />
                    <Grid container
                        spacing={ 2 }>
                        <Grid item
                            xs={ 6 }>
                            <TextField id="outlined-basic" label="Your Play" variant="outlined"
                                value={ yourPlay }
                                onChange={
                                    (event) => {
                                        setYourPlay(event.target.value)
                                    }
                                } />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs>
                            <TextField id="outlined-basic" disabled label="Bot Play" variant="outlined"
                                value={ botPlay } />
                        </Grid>
                        <Grid item
                            xs={ 6 }>
                            <TextField id="outlined-basic" label="Your Guess" variant="outlined"
                                value={ yourGuess }
                                onChange={
                                    (event) => {
                                        setYourGuess(event.target.value)
                                    }
                                } />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs>
                            <TextField id="outlined-basic" disabled label="Bot Guess" variant="outlined"
                                value={ botGuess } />
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item
                            xs={ 6 }>
                            <p>Your Score: { yourScore }</p>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs>
                            <p>Bot Score: { botScore }</p>
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container
                        spacing={ 2 }>
                        <Grid item
                            xs={ 12 }>
                            <Button variant="contained" color="primary"
                                onClick={ handleClick }>
                                Play
                            </Button>
                        </Grid>
                        <Grid item
                            xs={ 12 }>
                            <Button variant="contained" color="primary"
                                onClick={ handleEndGame }>
                                End Game and Save Score
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                    <Divider flexItem />
                    <br />
                </div>
            )
        } </div>

    )
}
