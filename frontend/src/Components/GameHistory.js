import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';

export default function GameHistory() {

    const [responseHistory, setResponseHistory] = React.useState([]);
    const navigate = useNavigate();
    const [isSignedIn, setIsSignedIn] = React.useState(false);

    useEffect(() => {
        localStorage.getItem("token") === null ? setIsSignedIn(false) : setIsSignedIn(true)
    }, [])

    // useEffect(() => {
    //   if (isSignedIn) {
    //     const user_id = localStorage.getItem("user_id");
    //     axios.get("http://127.0.0.1:3001/api/game/history/" + user_id, {
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('token')
    //         }
    //     }).then(response => {
    //         setResponseHistory(response.data);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }
    // }, [])

    const loadGameHistory = () => {
      const user_id = localStorage.getItem("user_id");
        axios.get("http://127.0.0.1:3001/api/game/history/" + user_id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            setResponseHistory(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const handleSignout = (event) => {
        console.log("GamePage: handleSignout");
        event.preventDefault();
        localStorage.clear();
        axios.get("http://localhost:3001/auth/signout/").then(response => {
            console.log(response);
            navigate('/signin');
        }).catch(error => {
            console.log(error);
        })
    }

    function formatDate(d) {
        var date = new Date(d);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getDate() + "/" + (
            date.getMonth() + 1
        ) + "/" + date.getFullYear() + "  " + strTime;
    }

    return (<div> {
        !isSignedIn ? (
                  <div>
                      <h1>
                          <Link to="/signin">Sign In To View This Page</Link>
                      </h1>
                  </div>
              ) : (
                  <div>
                <h1>Game History</h1>
                <AppBar position="static">
                        <Toolbar variant='dense'>
                            <Typography variant="body" component="div"
                                sx={
                                    {flexGrow: 2}
                            }>
                                <Link to="/gamepage">Game Page</Link>
                                
                            </Typography>
                            <Typography variant="body" component="div"
                                sx={
                                    {flexGrow: 2}
                            }>
                                <Link to="/account">Your Account</Link>
                            </Typography>
                            <Button color="inherit"
                                onClick={handleSignout}>
                                Sign Out
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <br/>
                    <Button variant="contained" color="primary"
                        onClick={loadGameHistory}>
                    
                      Load Game History
                    </Button>
                    <br/>
                    <br/>
                <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Date and Time</TableCell>
                    <TableCell align="right">Your Score</TableCell>
                    <TableCell align="right">Bot's Score</TableCell>
                    <TableCell align="right">Did You Win?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {responseHistory.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {formatDate(row.date)}
                      </TableCell>
                      <TableCell align="right">{row.yourScore}</TableCell>
                      <TableCell align="right">{row.botScore}</TableCell>
                      <TableCell align="right">{row.winner}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
                  </div>
              )}
            </div>
        )
    }
